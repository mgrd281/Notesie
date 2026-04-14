// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "Notesie",
    platforms: [
        .iOS(.v14)
    ],
    products: [
        .library(name: "Notesie", targets: ["Notesie"])
    ],
    dependencies: [],
    targets: [
        .target(
            name: "Notesie",
            dependencies: [],
            path: "src"
        )
    ]
)
