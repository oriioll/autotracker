$destination = "O:\oriol\autotracker\src\assets\carriers"
$baseUrl = "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons"

$carriers = @(
    "dhl",
    "ups",
    "fedex",
    "gls",
    "dpd",
    "inpost",
    "royalmail",
    "usps",
    "canadapost",
    "australiapost",
    "aramex",
    "postnl",
    "postnord",
    "laposte",
    "chronopost",
    "colissimo",
    "bpost",
    "deutschepost",
    "posteitaliane",
    "correos",
    "ctt",
    "mondialrelay",
    "evri",
    "hermes",
    "yodel",
    "ontrac",
    "sendle",
    "yunexpress",
    "cainiao",
    "4px",
    "sfexpress",
    "jtexpress",
    "tnt",

    # Otros carriers / logística internacional
    "dhlfreight",
    "dhlexpress",
    "dpdgroup",
    "geodis",
    "kuehnenagel",
    "maersk",
    "dbschenker",
    "hellmannworldwide",
    "expeditors",
    "xpo",
    "cevalogistics",
    "nacex",
    "mrw",
    "seur",
    "correosexpress",
    "celeritas",
    "paack",
    "sending",
    "tipsa",
    "redur",

    # Asia / e-commerce logistics
    "chinaPost",
    "japanpost",
    "singaporepost",
    "koreapost",
    "hongkongpost",
    "yanwen",
    "wanbexpress",
    "cne",
    "jdlogistics",
    "jtexpress",
    "sfexpress",
    "ztoexpress",
    "ytoexpress",
    "stoexpress",
    "bestexpress"
)

if (!(Test-Path $destination)) {
    New-Item -ItemType Directory -Path $destination -Force | Out-Null
}

Write-Host ""
Write-Host "Downloading carrier icons..." -ForegroundColor Cyan
Write-Host "Destination: $destination"
Write-Host ""

$downloaded = 0
$missing = 0

foreach ($carrier in $carriers) {

    $url = "$baseUrl/$carrier.svg"
    $output = Join-Path $destination "$carrier.svg"

    try {

        Invoke-WebRequest `
            -Uri $url `
            -OutFile $output `
            -ErrorAction Stop

        Write-Host "OK   $carrier.svg" -ForegroundColor Green
        $downloaded++

    }
    catch {

        if (Test-Path $output) {
            Remove-Item $output -Force
        }

        Write-Host "MISS $carrier.svg" -ForegroundColor DarkYellow
        $missing++
    }
}

Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "Downloaded: $downloaded" -ForegroundColor Green
Write-Host "Missing:    $missing" -ForegroundColor Yellow
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Done."