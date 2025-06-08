import path from "node:path";
import config from "../config";
import AdmZip from "adm-zip";

export async function zipResourcePack(
  packName: string,
  type: string = "development_resource_packs",
): Promise<void> {
  console.log(`Zipping resource pack '${packName}' ...`);

  const resourcePackDirectoryPath = path.join(
    config.minecraftDirectoryPath,
    type,
    packName,
  );

  const resourcePackZipPath = path.join(
    config.minecraftDirectoryPath,
    type,
    `${packName}.zip`,
  );

  const zip = new AdmZip();
  zip.addLocalFolder(resourcePackDirectoryPath);
  zip.writeZip(resourcePackZipPath);

  console.log(`Resource pack '${packName}' zipped successfully.`);
}
