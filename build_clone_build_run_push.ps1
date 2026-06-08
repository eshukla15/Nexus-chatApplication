$ErrorActionPreference = "Stop"

# ==========================
# Configuration
# ==========================

$GitHubRepo = "https://github.com/eshukla15/Nexus-chatApplication.git"

$CloneDir   = "NexusChatApp"
# ==========================
Write-Host "Cloning repository..."

git clone $GitHubRepo $CloneDir

Set-Location $CloneDir



Write-Host "Installing dependencies and building..."
npm run build

Write-Host "Running tests..."
npm run test

Write-Host "Project setup completed."