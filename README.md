# AppScan Source file generator for Node Applications
(This project is licensed under the terms of the Apache 2.0 License)

This simple app generate ppf and paf files for node aplications.

## First version features

Nowadays, this only generates the files without exclusions. So AppScan will scan all the dependencies of the application located in node_modules/

## Usage

Copy executable to your node application's root folder and then just run:

### Linux

```
  linux/node_app $ ./nodeAppScan
```

### Macos 

```
  macos/node_app $ ./nodeAppScan
```

### Windows

```
  c:/win/node_app > nodeAppScan.exe
```

### Technologies

#### Node packages

  >"xmlbuilder": "^9.0.4"
  >"graceful-fs": "^4.1.11"

  > pkg for packaging to executable
