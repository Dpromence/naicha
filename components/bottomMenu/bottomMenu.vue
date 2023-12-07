<template>
	<view class="img-list">
		<view class="menuList">
			<view class="menu " :class="menuActive == 1?'active':''" @click="menuTap(1)">
				<img v-if="menuActive == 1" src="@/static/tabBar/icon1-2.png" alt="">
				<img v-else src="@/static/tabBar/icon1-1.png" alt="">
				<span>首页</span>
			</view>
			<view class="menu" :class="menuActive == 2?'active':''" @click="menuTap(2)">
				<img v-if="menuActive == 2" src="@/static/tabBar/icon2-2.png" alt="">
				<img v-else src="@/static/tabBar/icon2-1.png" alt="">
				<span>菜单</span>
			</view>
			<view class="menu" :class="menuActive == 3?'active':''" @click="menuTap(3)">
				<img v-if="menuActive == 3" src="@/static/tabBar/icon3-2.png" alt="">
				<img v-else src="@/static/tabBar/icon3-1.png" alt="">
				<span>订单</span>
			</view>
			<view class="menu" :class="menuActive == 4?'active':''" @click="menuTap(4)">
				<img v-if="menuActive == 4" src="@/static/tabBar/icon4-2.png" alt="">
				<img v-else src="@/static/tabBar/icon4-1.png" alt="">
				<span>我的</span>
			</view>
		</view>
		<view class="" v-if="isFullSucreen" style="height: 60rpx;background: #fff;">
			
		</view>
	</view>
</template>
 
<script>
	export default {
		props: {
			menuActive: {
				
			}
		},
		data() {
			return {
				isFullSucreen: uni.getStorageSync('isFullSucreen')
			}
		},
		mounted() {
			
		},
		methods: {
			menuTap(index) {
				if (index == this.menuActive) {
					return
				}
				if (index == 1) {
					uni.redirectTo({
						url: '/pages/index/index'
					})
				}
				if (index == 2) {
					uni.redirectTo({
						url: '/pages/goods/index'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.img-list {
		position: fixed;
		bottom: 0;
		width: 100%;
		background: #fff;
		z-index: 99;
	}
	.menuList {
		
		display: flex;
		height: 120rpx;
		z-index: 100;
		align-items: center;
		background: #fff;
		border-top: 1rpx solid #f6f6f6;
		.menu {
			color: #909399;
			font-size: 20rpx;
			text-align: center;
			flex: 1;
			// height: 40px;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: center;
			span {
				display: block;
				font-size: 24rpx;
				width: 100%;
			}
			img {
				width: 96rpx;
				height: 68rpx;
			}
		}
		.menu.active {
			font-size: 24rpx;
			color: #2B9F93;
			font-weight: bold;
			position: relative;
		}
		.menu.active:before {
			// position: absolute;
			// content: '';
			// bottom: 8px;
			// left: 50%;
			// transform: translate(-50%, 0);
			// width: 25px;
			// height: 4px;
			// border-radius: 2px;
			// background: linear-gradient(to right, #27F5CE ,#6F40FF);
		}
	}
</style>
