# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-24.05"; # or "unstable"

  # Use https://search.nixos.org/packages to find packages
  packages = [
    # Installs nodejs 20 for vite/react development
    pkgs.nodejs_20
  ];

  # Sets environment variables in the workspace
  env = {};
  
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      "google.gemini-cli-vscode-ide-companion",
      "dbaeumer.vscode-eslint", # ESLint for code quality
      "esbenp.prettier-vscode" # Prettier for code formatting
    ];

    # Enable previews
    previews = {
      enable = true;
      previews = {
        web = {
          # Command to run your development server
          command = ["npm" "run" "dev" "--" "--port" "$PORT"];
          manager = "web";
        };
      };
    };
    
    # Workspace lifecycle hooks
    workspace = {
      # Runs when a workspace is first created
      onCreate = {
        # Initialize a new Vite project if no package.json exists
        init-vite = ''
          if [ ! -f package.json ]; then
            npm create vite@latest . -- --template react && npm install
          else
            npm install
          fi
        '';
      };
      # Runs when the workspace is (re)started
      onStart = {};
    };
  };
}
