export default interface ProductModel {
  product_id: string;
  product_ksu?: string;
  product_name: string;
  product_alias?: string;
  product_intro?: string;
  product_info?: string;
  product_more_info?: string;
  product_how_to_use?: string;
  product_volume_weight?: string;
  product_brand_id: string;
  product_cat_id: number;
  product_price?: number;
  product_discount?: number;
  product_inventory_number?: number;
  product_created_date: any;
  product_updated_date?: any;
  product_deleted_date?: any;
}
