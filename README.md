# DaaS Mockup

This project is a DaaS mockup built with Vite. It requires Node.js 18 or higher.

Deployed on https://idaas-zeta.vercel.app/

## How to Work on This Repo

There are two copies of this repository:
- GitHub.com: Connected to Vercel for automatic preview deployments https://github.com/francoli74/idaas.
- Enterprise GitHub: Used for storage/backup purposes.

Recommended workflow:
1. Do all development on the GitHub.com repository. Push changes there to trigger automatic Vercel previews.
2. Every few days, download the GitHub.com repo as a ZIP.
3. Copy the extracted contents to SageMaker/DSA.
4. Commit and push from SageMaker/DSA to the Enterprise GitHub repository to keep it in sync.

## Node.js on SageMaker

If you are using Amazon SageMaker and try to install Node.js via `sudo apt`, you may receive Node.js v12 from the internal proxy server. To install Node.js v20 from the proxy server:

- Use a Jupyter notebook and run the installation command within the kernel.
- Point the installation path to a persistent directory (e.g., your home/user-private-folder) so it is not deleted when the kernel stops.

## Running the Project on SageMaker

Install dependencies (make sure to be in the repo):
- `npm install`

You can run:
- `npm run dev`
- `npm run preview`

However, you will not be able to preview the app directly in SageMaker. It is recommended to use VS Code and run the appropriate command to preview the app in your DSA browser.

## GitHub Pages

GitHub Pages deployment is configured, but it does not currently work on our enterprise GitHub. Feel free to try to get it working.
