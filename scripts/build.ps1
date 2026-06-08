$ErrorActionPreference = "Stop"

Write-Host "Frontend Build"

Set-Location frontend

npm ci
npm test
npm run build

Set-Location ..

Write-Host "Backend Tests"

Set-Location backend

npm ci
npm test

Set-Location ..
