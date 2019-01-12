export default interface CategoryModel {
  cat_id: string;
  cat_name: string;
  cat_path: string;
  cat_parent_id: string;
  cat_created_date: any;
  cat_updated_date?: any;
  cat_deleted_date?: any;
}
