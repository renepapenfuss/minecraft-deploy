import path from "node:path";
import config from "../config";
import AdmZip from "adm-zip";

export async function zipBehaviorPack(
  packName: string,
  type: string = "development_behavior_packs",
): Promise<void> {
  console.log(`Zipping behavior pack '${packName}' ...`);

  const behaviorPackDirectoryPath = path.join(
    config.minecraftDirectoryPath,
    type,
    packName,
  );

  const behaviorPackZipPath = path.join(
    config.minecraftDirectoryPath,
    type,
    `${packName}.zip`,
  );

  const zip = new AdmZip();
  zip.addLocalFolder(behaviorPackDirectoryPath);
  zip.writeZip(behaviorPackZipPath);

  console.log(`Behavior pack '${packName}' zipped successfully.`);
}
