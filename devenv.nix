{ pkgs, lib, config, inputs, ... }:

{
  # https://devenv.sh/packages/
  packages = [
    pkgs.go-task
  ];

  # https://devenv.sh/languages/
  languages.javascript = {
    enable = true;
    package = pkgs.nodejs_26;
    npm = {
      enable = true;
      install.enable = true;
    };
  };

  # See full reference at https://devenv.sh/reference/options/
}
