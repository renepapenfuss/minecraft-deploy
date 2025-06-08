# minecraft-deploy

This project provides automated deployment of Minecraft behavior packs to a remote server. It archives local behavior packs, transfers them via `rsync`, and then executes remote commands (e.g., unpacking and restarting Docker containers) via SSH.

## Features

- Archives Minecraft behavior packs as ZIP files
- Transfers ZIP files to a remote server using `rsync`
- Executes remote commands over SSH (e.g., unpacking, restarting Docker containers)
- Supports public key authentication

## Requirements

- Node.js (recommended: current LTS version)
- Linux-based operating system **or** WSL2 (Windows Subsystem for Linux)
- SSH access to the target server (public key authentication recommended)
- `rsync` must be installed locally and on the remote server

## Usage

1. **Configuration:**  
   Adjust the environment variables or the configuration file (`src/config.ts`) according to your environment (e.g., Minecraft directory, remote server, SSH key).

2. **Install dependencies:**  
   ```bash
   npm install
   ```

3. **Run deployment:**  
   ```bash
   npm start
   ```
   or call the corresponding function directly in the code.

## Notes

- The project currently works **only on Linux-based systems or WSL2**.
- Execution on Windows without WSL2 is not supported.
- Make sure your SSH key does not require a passphrase or that you provide the correct passphrase.

## License

MIT License
