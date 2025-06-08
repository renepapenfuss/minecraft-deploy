import { Argument, Command, Option } from "commander";
import { zipBehaviorPack } from "./services/zip-behavior-pack.servive";
import { zipResourcePack } from "./services/zip-resource-pack.servive";
import { deployBehaviorPack } from "./services/deploy-behavior-pack.service";
import { deployResourcePack } from "./services/deploy-resource-pack.servicey";

const program = new Command();

program
  .name("minecraft-deploy")
  .description(
    "A CLI to deploy locally developed addons for Minecraft Bedrock Edition.",
  )
  .version("1.0.0")
  .addCommand(
    new Command("zip-behavior-pack")
      .description("zips a behavior pack")
      .addArgument(
        new Argument(
          "<pack_name>",
          "The name of the behavior pack",
        ).argRequired(),
      )
      .action(async (packName: string) => {
        await zipBehaviorPack(packName);
      }),
  )
  .addCommand(
    new Command("zip-resource-pack")
      .description("zips a resource pack")
      .addArgument(
        new Argument(
          "<pack_name>",
          "The name of the resource pack",
        ).argRequired(),
      )
      .action(async (packName: string) => {
        await zipResourcePack(packName);
      }),
  )
  .addCommand(
    new Command("deploy-behavior-pack")
      .description(
        "deploys a behavior pack to a Minecraft Bedrock Edition server",
      )
      .addArgument(
        new Argument(
          "<pack_name>",
          "the name of the behavior pack to deploy",
        ).argRequired(),
      )
      .addOption(
        new Option(
          "-h, --host <host>",
          "The host of the remote server",
        ).makeOptionMandatory(true),
      )
      .addOption(
        new Option(
          "-u, --username <username>",
          "The username of the remote server",
        ).makeOptionMandatory(true),
      )
      .addOption(
        new Option(
          "-r, --remote-path <remote_path>",
          "The remote path on the remote server",
        ).makeOptionMandatory(true),
      )
      .addOption(
        new Option(
          "-k, --private-key-path <private_key_path>",
          "The path to the private key for SSH authentication",
        ).makeOptionMandatory(true),
      )
      .action(async (packName: string, remoteOptions) => {
        await deployBehaviorPack(packName, "development_behavior_packs", {
          host: remoteOptions.host,
          username: remoteOptions.username,
          remotePath: remoteOptions.remotePath,
          privateKeyPath: remoteOptions.privateKeyPath,
        });
      }),
  )
  .addCommand(
    new Command("deploy-resource-pack")
      .description(
        "deploys a resource pack to a Minecraft Bedrock Edition server",
      )
      .addArgument(
        new Argument(
          "<pack_name>",
          "the name of the resource pack to deploy",
        ).argRequired(),
      )
      .addOption(
        new Option(
          "-h, --host <host>",
          "The host of the remote server",
        ).makeOptionMandatory(true),
      )
      .addOption(
        new Option(
          "-u, --username <username>",
          "The username of the remote server",
        ).makeOptionMandatory(true),
      )
      .addOption(
        new Option(
          "-r, --remote-path <remote_path>",
          "The remote path on the remote server",
        ).makeOptionMandatory(true),
      )
      .addOption(
        new Option(
          "-k, --private-key-path <private_key_path>",
          "The path to the private key for SSH authentication",
        ).makeOptionMandatory(true),
      )
      .action(async (packName: string, remoteOptions) => {
        await deployResourcePack(packName, "development_resource_packs", {
          host: remoteOptions.host,
          username: remoteOptions.username,
          remotePath: remoteOptions.remotePath,
          privateKeyPath: remoteOptions.privateKeyPath,
        });
      }),
  );

program.parse();
