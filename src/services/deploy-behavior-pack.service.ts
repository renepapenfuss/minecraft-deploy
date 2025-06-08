import path from "node:path";
import fs from "node:fs";
import config from "../config";
import Rsync from "rsync";
import { Client } from "ssh2";

interface RemoteOptions {
  host: string;
  username: string;
  remotePath: string;
  privateKeyPath: string;
}

export async function deployBehaviorPack(
  packName: string,
  type: string = "development_behavior_packs",
  remoteOptions: RemoteOptions,
): Promise<void> {
  console.log(`Deploy behavior pack '${packName}' ...`);

  const behaviorPackZipPath = path.join(
    config.minecraftDirectoryPath,
    type,
    `${packName}.zip`,
  );

  await _rsyncToRemote(behaviorPackZipPath, remoteOptions);
  await _runRemoteCommand(
    `
    cd "${remoteOptions.remotePath}"
    ls -la
  `,
    remoteOptions,
  );

  console.log(`Behavior pack '${packName}' deployed successfully.`);
}

function _rsyncToRemote(
  localFile: string,
  remoteOptions: RemoteOptions,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const { username, host, remotePath: path } = remoteOptions;
    const remote = `${username}@${host}:${path}/`;

    const rsync = new Rsync()
      .flags("avz")
      .set("progress")
      .source(localFile)
      .destination(remote);

    rsync.execute((error, code) => {
      if (error) {
        return reject(new Error(`Rsync failed: ${error.message}`));
      }

      if (code !== 0) {
        return reject(new Error(`Rsync exited with code ${code}`));
      }

      resolve();
    });
  });
}

function _runRemoteCommand(
  command: string,
  remoteOptions: RemoteOptions,
): Promise<void> {
  const { host, username, privateKeyPath } = remoteOptions;

  let privateKey: Buffer | undefined;
  if (privateKeyPath) {
    privateKey = fs.readFileSync(privateKeyPath);
  }

  return new Promise((resolve, reject) => {
    const conn = new Client();
    conn
      .on("ready", () => {
        conn.exec(command, (err, stream) => {
          if (err) return reject(err);
          stream
            .on("close", (code: number) => {
              conn.end();
              if (code === 0) resolve();
              else reject(new Error(`Remote command exited with code ${code}`));
            })
            .on("data", (data: Uint8Array | string) => {
              process.stdout.write(data);
            })
            .stderr.on("data", (data) => {
              process.stderr.write(data);
            });
        });
      })
      .on("error", reject)
      .connect({
        host,
        port: 22,
        username,
        privateKey,
      });
  });
}
