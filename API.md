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
      "id": "cjld2cjxh0000qzrmn831i7rn",
      "name": "Colors/Accent",
      "colorRed": 87,
      "colorGreen": 124,
      "colorBlue": 254,
      "colorAlpha": "1",
      "metadata": {
        "source": "localStyles"
      },
      "createdAt": "2021-11-04T13:38:10.475Z",
      "updatedAt": "2021-11-04T13:38:10.475Z"
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
    "colorRed": 87,
    "colorGreen": 124,
    "colorBlue": 254,
    "colorAlpha": 1,
    "metadata": {
      "source": "localStyles"
    },
  }
```

Example response:

```json
{
  "colorToken": {
    "id": "cjld2cjxh0000qzrmn831i7rn",
    "name": "Colors/Accent",
    "colorRed": 87,
    "colorGreen": 124,
    "colorBlue": 254,
    "colorAlpha": 1,
    "meta": {
      "source": "localStyles"
    },
    "createdAt": "2021-11-04T16:17:37.436Z",
    "updatedAt": "2021-11-04T16:17:37.436Z"
  }
}
```

## GET `/api/colorTokens/[tokenId]`

Returns a single stored color token by its ID. 

Example response:

```json
{
  "colorToken": {
    "id": "cjld2cjxh0000qzrmn831i7rn",
    "name": "Colors/Accent",
    "colorRed": 87,
    "colorGreen": 124,
    "colorBlue": 254,
    "colorAlpha": "1",
    "metadata": {
      "source": "localStyles"
    },
    "createdAt": "2021-11-04T13:38:10.475Z",
    "updatedAt": "2021-11-04T13:38:10.475Z"
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
    "id": "cjld2cjxh0000qzrmn831i7rn",
    "name": "Colors/NewAccent",
    "colorRed": 87,
    "colorGreen": 124,
    "colorBlue": 254,
    "colorAlpha": "1",
    "metadata": {
      "source": "localStyles"
    },
    "createdAt": "2021-11-04T13:38:10.475Z",
    "updatedAt": "2021-11-04T13:38:10.475Z"
  }
}
```

## DELETE `/api/colorTokens/[tokenId]`

Deletes the given color token and returns its value. 

Example response:

```json
{
  "colorToken": {
    "id": "cjld2cjxh0000qzrmn831i7rn",
    "name": "Colors/NewAccent",
    "colorRed": 87,
    "colorGreen": 124,
    "colorBlue": 254,
    "colorAlpha": "1",
    "metadata": {
      "source": "localStyles"
    },
    "createdAt": "2021-11-04T13:38:10.475Z",
    "updatedAt": "2021-11-04T13:38:10.475Z"
  }
}
```

## GET `/api/colorTokens/export`

Returns all color tokens in a given format. You can specify the format by passing a `type` query parameter. To download the tokens as a file, add a `download=1` query parameter.