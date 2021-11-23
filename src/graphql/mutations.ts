/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const deleteItems = /* GraphQL */ `
  mutation DeleteItems($id: String!) {
    deleteItems(id: $id) {
      id
      title
    }
  }
`;
export const createItems = /* GraphQL */ `
  mutation CreateItems($createItemsInput: CreateItemsInput!) {
    createItems(createItemsInput: $createItemsInput) {
      id
      title
    }
  }
`;
export const updateItems = /* GraphQL */ `
  mutation UpdateItems($updateItemsInput: UpdateItemsInput!) {
    updateItems(updateItemsInput: $updateItemsInput) {
      id
      title
    }
  }
`;
export const createItem = /* GraphQL */ `
  mutation CreateItem(
    $input: CreateItemInput!
    $condition: ModelItemConditionInput
  ) {
    createItem(input: $input, condition: $condition) {
      id
      title
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const updateItem = /* GraphQL */ `
  mutation UpdateItem(
    $input: UpdateItemInput!
    $condition: ModelItemConditionInput
  ) {
    updateItem(input: $input, condition: $condition) {
      id
      title
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const deleteItem = /* GraphQL */ `
  mutation DeleteItem(
    $input: DeleteItemInput!
    $condition: ModelItemConditionInput
  ) {
    deleteItem(input: $input, condition: $condition) {
      id
      title
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
