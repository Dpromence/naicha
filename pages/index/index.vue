<template>
	<view class="content">
		<view class="navBar" :style="{height: navBarHeight+'rpx'}"></view>
		<navBar title="COCO奶茶" :leftIcon="false" :dark="false"></navBar>

		<scroll-view class="scroll-view_H" :scroll-y="true" :style="{height: 'calc(100vh - '+(sucreenHeight)+'rpx)'}" scroll-x="true"
			scroll-left="0">
			<view class="banner">
				<swiper class="swiper" :indicator-dots="true" indicator-active-color="rgba(43,159,147, 1)"
					style="height: 256rpx;">
					<swiper-item>
						<img src="@/static/banner/banner.png" mode="widthFix" alt="">
					</swiper-item>
					<swiper-item>
						<img src="@/static/banner/banner.png" mode="widthFix" alt="">
					</swiper-item>
				</swiper>
			</view>
			<view class="title">
				新品New
			</view>
			<view class="goodsList">
				<scroll-view class="goodsListView" scroll-x="true">
					<view class="scroll-view-item_H">
						<view class="img">
							<img src="@/static/goods/img1.png" alt="">
						</view>
						<view class="goodsName">
							复合果茶
						</view>
					</view>
					<view class="scroll-view-item_H">
						<view class="img">
							<img src="@/static/goods/img2.png" alt="">
						</view>
						<view class="goodsName">
							草莓奶昔
						</view>
					</view>
					<view class="scroll-view-item_H">
						<view class="img">
							<img src="@/static/goods/img3.png" alt="">
						</view>
						<view class="goodsName">
							小青桔冰沙
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="title" style="margin-top: 68rpx;">
				热卖Hot
			</view>
			<view class="hotList">
				<view class="list">
					<view class="img">
						<img src="@/static/goods/img4.png" alt="">
					</view>
					<view class="right">
						<view class="goodsName">
							生椰抹茶麻薯
						</view>
						<view class="des">
							抹茶x生椰乳x米麻薯x芋圆 特调抹茶人气回归！优选江南茶叶交融清甜椰乳，笑料全新升级，软糯拉丝米麻薯
						</view>
						<view class="priceRect">
							<view class="price">
								<span>￥</span>14
							</view>
							<view class="button">
								选规格
							</view>
						</view>
					</view>
				</view>
				<view class="list">
					<view class="img">
						<img src="@/static/goods/img5.png" alt="">
					</view>
					<view class="right">
						<view class="goodsName">
							芋见青稞抹茶
						</view>
						<view class="des">
							抹茶x牛奶x芋奶x芋泥x青稞 特调抹茶人气回归！优选江南茶区抹茶搭配绵密芋泥与饱满青稞，香浓有料，口口满足。
						</view>
						<view class="priceRect">
							<view class="price">
								<span>￥</span>16
							</view>
							<view class="button">
								选规格
							</view>
						</view>
					</view>
				</view>
				<view class="list">
					<view class="img">
						<img src="@/static/goods/img6.png" alt="">
					</view>
					<view class="right">
						<view class="goodsName">
							COCO奶茶
						</view>
						<view class="des">
							经典纯奶茶免费加珍珠和野果【中杯杯型容量500ml；大杯杯型容量645ml】*标注容量仅供参考，饮品量请以实际出品为准
						</view>
						<view class="priceRect">
							<view class="price">
								<span>￥</span>18
							</view>
							<view class="button">
								选规格
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="" style="height: 30rpx;">
				
			</view>
		</scroll-view>
		<bottomMenu :menuActive="1"></bottomMenu>
	</view>
</template>

<script>
	import navBar from '@/components/navBar/navBar.vue'
	import bottomMenu from '@/components/bottomMenu/bottomMenu.vue'
	export default {
		components: {
			navBar,
			bottomMenu
		},
		data() {
			return {
				navBarHeight: uni.getStorageSync('navBarHeight'),
				sucreenHeight: uni.getStorageSync('sucreenHeight')
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="less" scoped>
	.content {
		.scroll-view_H {
			.banner {
				width: calc(100% - 60rpx);
				margin: 0 auto;
				height: 256rpx;
				border-radius: 20rpx;
				overflow: hidden;
				background: #f8f8f8;

				img {
					width: 100%;
					height: 100%;
				}
			}

			.title {
				width: calc(100% - 80rpx);
				margin: 0 auto;
				font-size: 30rpx;
				color: #121212;
				font-weight: 600;
				margin-top: 35rpx;
				line-height: 32rpx;
				position: relative;
				padding-left: 20rpx;
			}

			.title::after {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				width: 6rpx;
				height: 100%;
				background: #fe5509;
				border-radius: 4rpx;
			}

			.goodsList {
				width: calc(100% - 60rpx);
				margin: 0 auto;
				height: 258rpx;
				background: #f8f8f8;
				margin-top: 38rpx;

				.goodsListView {
					white-space: nowrap;
					width: 100%;
					display: flex;
					background: #fff;
					justify-content: flex-start;
					height: 258rpx;

					.scroll-view-item_H {
						width: 210rpx;
						display: inline-block;
						margin-right: 30rpx;

						.img {
							line-height: 0;

							img {
								width: 210rpx;
								height: 210rpx;
							}
						}

						.goodsName {
							text-align: center;
							font-size: 24rpx;
							line-height: 24rpx;
							color: #606266;
							margin-top: 24rpx;
						}
					}

					.scroll-view-item_H:last-of-type {
						margin-right: 0rpx;
					}
				}
			}

			.hotList {
				width: calc(100% - 60rpx);
				margin: 38rpx auto 0;

				.list {
					display: flex;
					align-items: center;
					justify-content: flex-start;
					margin-bottom: 32rpx;
					.img {
						width: 210rpx;
						height: 210rpx;
						border-radius: 10rpx;
						overflow: hidden;
						background: #f8f8f8f;

						img {
							width: 210rpx;
							height: 210rpx;
						}
					}

					.right {
						flex: 1;
						margin-left: 32rpx;

						.goodsName {
							font-size: 28rpx;
							font-weight: 700;
							color: #121212;
						}

						.des {
							width: 100%;
							font-size: 22rpx;
							font-weight: 400;
							color: #909399;
							line-height: 32rpx;
							display: -webkit-box; // 将对象作为弹性伸缩盒子模型显示
							-webkit-box-orient: vertical; // 设置或检索伸缩盒对象的子元素的排列方式
							-webkit-line-clamp: 2; // 显示两行
							overflow: hidden;
							margin-top: 18rpx;
						}

						.priceRect {
							display: flex;
							align-items: center;
							justify-content: space-between;
							margin-top: 20rpx;
							.price {
								font-size: 32rpx;
								font-weight: 700;
								color: #121212;
								span {
									font-size: 24rpx;
									font-weight: 500;
								}
							}
							.button {
								width: 94rpx;
								height: 44rpx;
								line-height: 44rpx;
								color: #fff;
								font-size: 22rpx;
								background: #2B9F93;
								border-radius: 8rpx;
								text-align: center;
							}
						}
					}
				}
			}

		}
	}
</style>