# Routes
This document will explain what events are triggered by which routes

### `GET /libs`
Returns the libs.json file

### `POST /postLibrary`
Posts a library into unapprovedLibs.json for approval

`Name`: Package Name

`Description`: Package Description

`Author`: Package author

`Serialized`: JSON encoded string for decoding the package

### `POST /accept`
Accept a library into libs.json (admin key needed)

`ID`: Package ID

`Authentication`: Authentication key

### `POST /download`
Only used for the get by ID button

`ID`: Package ID

### `GET /unapprovedLibs`
Returns the unapprovedLibs.json file, visit at your own risk of malicious code.
