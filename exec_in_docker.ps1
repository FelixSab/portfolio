$ProjectName = Split-Path $PSScriptRoot -Leaf
$BuildImageName = "felixsab/$($ProjectName)"

docker build -t $BuildImageName -f ./scripts/docker/Dockerfile .

docker run `
  -it `
  -v "${PSScriptRoot}:/usr/app" `
  -p 8080:8080 `
  "${BuildImageName}"
