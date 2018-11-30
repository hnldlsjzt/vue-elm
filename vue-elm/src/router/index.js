import Vue from 'vue';
import Router from 'vue-router';
import HeaderItem from '@/components/header/HeaderItem';
import GoodsItem from '@/components/goods/GoodsItem';
import RatingsItem from '@/components/ratings/RatingsItem';
import SellerItem from '@/components/seller/SellerItem';

Vue.use(Router);

let router = new Router({
  linkActiveClass: 'active',
  routes: [{
    path: '/',
    name: 'HeaderItem',
    component: HeaderItem
  }, {
    path: '/GoodsItem',
    name: 'GoodsItem',
    component: GoodsItem
  }, {
    path: '/RatingsItem',
    name: 'RatingsItem',
    component: RatingsItem
  }, {
    path: '/SellerItem',
    name: 'SellerItem',
    component: SellerItem
  }]
});
router.push('GoodsItem');
export default router;
