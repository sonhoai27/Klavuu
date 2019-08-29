/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function(config) {
    config.filebrowserImageBrowseUrl = '/finder?type=Images',
    config.filebrowserImageUploadUrl = '/finder/upload?type=Images&_token=',
    config.filebrowserBrowseUrl = '/finder?type=Files',
    config.filebrowserUploadUrl = '/finder/upload?type=Files&_token='
};