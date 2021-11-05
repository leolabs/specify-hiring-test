# API Documentation

The API allows you to create, read, update, and delete color tokens. It also offers an endpoint to export all color tokens into a file that can be imported into your project of choice.

All API responses wrap the data in a separate key. This allows us to provide additional metadata in the future.

## GET `/api/colorTokens`

Returns a list of all stored color tokens. 

Example response:

```json
{
  "colorTokens": [
    {
      "id": "ckvmcntv00009950hocxmvh5i",
      "name": "Colors/Red",
      "value": {
        "a": 1,
        "b": 63,
        "g": 72,
        "r": 245
      },
      "meta": {
        "source": "localStyles"
      },
      "createdAt": "2021-11-05T12:24:17.388Z",
      "updatedAt": "2021-11-05T12:24:17.388Z"
    }
  ]
}
```

## POST `/api/colorTokens`

Creates a new color token with the data passed as a JSON body. The data schema must adhere to Prisma's ColorToken model. 

Example request:

```json
{
  "name": "Colors/Accent",
  "value": {
    "a": 1,
    "b": 185,
    "g": 32,
    "r": 139
  },
  "meta": {
    "source": "localStyles"
  },
}
```

Example response:

```json
{
  "colorToken": {
    "id": "ckvmct83v0014dw0hvigoia52",
    "name": "Colors/Accent",
    "value": {
      "a": 1,
      "b": 185,
      "g": 32,
      "r": 139
    },
    "meta": {
      "source": "localStyles"
    },
    "createdAt": "2021-11-05T12:28:29.131Z",
    "updatedAt": "2021-11-05T12:28:29.131Z"
  }
}
```

## GET `/api/colorTokens/[tokenId]`

Returns a single stored color token by its ID. 

Example response:

```json
{
  "colorToken": {
    "id": "ckvmct83v0014dw0hvigoia52",
    "name": "Colors/Accent",
    "value": {
      "a": 1,
      "b": 185,
      "g": 32,
      "r": 139
    },
    "meta": {
      "source": "localStyles"
    },
    "createdAt": "2021-11-05T12:28:29.131Z",
    "updatedAt": "2021-11-05T12:28:29.131Z"
  }
}
```

## PATCH `/api/colorTokens/[tokenId]`

Changes properties of the given color token. The data schema must adhere to Prisma's ColorToken model. 

Example request:

```json
{
  "name": "Colors/NewAccent",
}
```

Example response:

```json
{
  "colorToken": {
    "id": "ckvmct83v0014dw0hvigoia52",
    "name": "Colors/Accent",
    "value": {
      "a": 1,
      "b": 185,
      "g": 32,
      "r": 139
    },
    "meta": {
      "source": "localStyles"
    },
    "createdAt": "2021-11-05T12:28:29.131Z",
    "updatedAt": "2021-11-05T12:28:29.131Z"
  }
}
```

## DELETE `/api/colorTokens/[tokenId]`

Deletes the given color token and returns its value. 

Example response:

```json
{
  "colorToken": {
    "id": "ckvmct83v0014dw0hvigoia52",
    "name": "Colors/Accent",
    "value": {
      "a": 1,
      "b": 185,
      "g": 32,
      "r": 139
    },
    "meta": {
      "source": "localStyles"
    },
    "createdAt": "2021-11-05T12:28:29.131Z",
    "updatedAt": "2021-11-05T12:28:29.131Z"
  }
}
```

## GET `/api/colorTokens/export/formats`

Returns an array of all supported formats and their metadata.

## GET `/api/colorTokens/export/[format]`

Returns all color tokens in a given format. To download the tokens as a file, add a `download=1` query parameter.

Currently supported formats: `css`, `scss`, `jss`