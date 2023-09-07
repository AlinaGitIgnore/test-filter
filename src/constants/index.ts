export const FILTERED_TABS = [
  {
    section: 'id',
    label: 'ID',
    values: [] as (string | number)[],
  },
  {
    section: 'title',
    label: 'Title',
    values: [] as (string | number)[],
  },
  {
    section: 'description',
    label: 'Description',
    values: ['with description', 'without description'],
  },
  {
    section: 'price',
    label: 'Price',
    values: [] as (string | number)[],
  },
  {
    section: 'images',
    label: 'Image',
    values: ['with image', 'without image'],
  },
  {
    section: 'rating',
    label: 'Rating',
    values: [] as (string | number)[],
  },
  {
    section: 'stock',
    label: 'Stock',
    values: [] as (string | number)[],
  },
  {
    section: 'category',
    label: 'Category',
    values: [] as (string | number)[],
  },
];

export const TABLE_HEADERS = [
  { label: 'ID', sortable: true, filterable: true },
  { label: 'Title', sortable: true, filterable: true },
  { label: 'Description', sortable: true, filterable: true },
  { label: 'Price', sortable: true, filterable: true },
  { label: 'Image', sortable: true, filterable: true },
  { label: 'Rating', sortable: true, filterable: true },
  { label: 'Stock', sortable: true, filterable: true },
  { label: 'Category', sortable: true, filterable: true },
];
