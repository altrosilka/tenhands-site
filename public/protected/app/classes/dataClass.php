<?php
class Data
{
	private $categories;
	private $shops;
	private $colors;

	public function __construct($api, $defs) {
        global $link;
        $this->link =& $link;
        $this->api =& $api;
        $this->defines =& $defs;
    }

    public function constructCollection($hash, $category, $limit, $page = 1, $order = 'new'){
    	$collection = $this->api->get('catalog/getLots',array("hash"=>$hash, "category"=>$category['id'], "limit"=>$limit, "page"=>$page, "order"=>$order));



        foreach($collection->lotsArray as $k=>$v){
            if ($category === null){
                $categoryUrl = $this->defines->getCategoryById($v->category_id)['english_name'];
            } else {
                $categoryUrl = $category['english_name'];
            }
            $shop = $this->defines->getShopById($v->shop_id);

            $v->shop = (object) $shop;
            $v->category_eng = $categoryUrl;
        }
        return $collection;
    }


}