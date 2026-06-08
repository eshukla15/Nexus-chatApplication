$ErrorActionPreference = "Stop"

Write-Host "Frontend Build"

Set-Location frontend

npm install --legacy-peer-deps
npm test
npm run build

Set-Location ..

Write-Host "Backend Tests"

Set-Location backend

npm install --legacy-peer-deps
npm test

Set-Location ..
