<template>
	<view class="content">
		<view class="navBar" :style="{height: navBarHeight+'rpx'}"></view>
		<navBar title="COCO奶茶" :leftIcon="false" :dark="false"></navBar>
		<view :class="bannerStatus?'banner':'banner1'">
			<swiper class="swiper" :indicator-dots="true" indicator-active-color="rgba(43,159,147, 1)"
				style="height: 256rpx;">
				<swiper-item>
					<img src="@/static/banner/banner2.png" mode="widthFix" alt="">
				</swiper-item>
				<swiper-item>
					<img src="@/static/banner/banner2.png" mode="widthFix" alt="">
				</swiper-item>
			</swiper>
		</view>

		<view class="box" :style="{height: 'calc(100vh - '+(sucreenHeight)+'rpx)'}">
			<view class="left">
				<scroll-view class="scroll-view_H" :style="{height: 'calc(100vh - '+(sucreenHeight + 256)+'rpx)'}"
					scroll-Y="true">
					<view class="menu" @tap="choiceMenu(index)" :class="index == menuIndex?'active':''"
						v-for="(item,index) in menuList" :key="index">
						{{item.title}}
					</view>
				</scroll-view>
			</view>
			<view class="right">
				<scroll-view class="scroll-view_H" @scroll="scroll"
					:style="{height: 'calc(100vh - '+(sucreenHeight)+'rpx)'}" :scroll-Y="true">
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
				</scroll-view>
			</view>
		</view>
		// 购物车
		<view class="bottomBox">
			<view class="bottomCart">
				<view class="left">
					<view class="brage">
						99
					</view>
					<img src="@/static/goods/cart.png" alt="">
				</view>
				<view class="mid">
					<view class="price">
						预计到手 ￥32
					</view>
					<view class="des">
						已享受更低优惠，共减免￥26
					</view>
				</view>
				<view class="right">
					去结算
				</view>
			</view>
			<view class="" :style="{height: 'calc('+(buttomMenuHeight)+'rpx)'}">
				<bottomMenu :menuActive="2"></bottomMenu>
			</view>
		</view>
		<view class="maskBox">
			<view class="maskRect">
				<view class="">
					<view class="topDeal">
						<view class="choiceAll">
							<img src="@/static/goods/choice.png" alt="">
						</view>
						<view class="mid">
							已选购商品(2件)
						</view>
						<view class="del">
							<img src="@/static/goods/del.png" alt="">
							<view class="">
								清空购物车
							</view>
						</view>
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
									大杯，全糖，正常冰
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
								<img src="@/static/goods/img4.png" alt="">
							</view>
							<view class="right">
								<view class="goodsName">
									生椰抹茶麻薯
								</view>
								<view class="des">
									大杯，全糖，正常冰
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
					</view>
				</view>
				<view :style="{height: 'calc('+(buttomMenuHeight + 96 + 20)+'rpx)'}">
					
				</view>
			</view>
			
		</view>
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
				buttomMenuHeight: uni.getStorageSync('buttomMenuHeight'),
				menuIndex: 0,
				bannerStatus: true,
				navBarHeight: uni.getStorageSync('navBarHeight'),
				sucreenHeight: uni.getStorageSync('sucreenHeight'),
				menuList: [{
						title: '人气TOP',
						id: 1
					},
					{
						title: '灵感上新',
						id: 2
					},
					{
						title: '评价推荐',
						id: 3
					},
					{
						title: '经典饮品',
						id: 4
					},
					{
						title: '精品果茶',
						id: 5
					},
					{
						title: '精品甜点',
						id: 6
					},
					{
						title: '精选咖啡',
						id: 7
					},
					{
						title: '加料',
						id: 8
					}
				]
			}
		},
		onLoad() {

		},
		methods: {
			scroll(res) {
				if (res.detail.scrollTop >= 100) {
					this.bannerStatus = false
				} else {
					this.bannerStatus = true
				}
			},
			choiceMenu(index) {
				this.menuIndex = index
			}
		}
	}
</script>

<style lang="less" scoped>
	.content {
		.banner {
			width: calc(100% - 60rpx);
			margin: 0 auto;
			height: 256rpx;
			border-radius: 20rpx;
			overflow: hidden;
			background: #f8f8f8;
			transition: all 0.3s ease;
			margin-bottom: 30rpx;

			img {
				width: 100%;
				height: 100%;
			}
		}

		.banner1 {
			width: calc(100% - 60rpx);
			margin: 0 auto;
			height: 0;
			border-radius: 20rpx;
			overflow: hidden;
			background: #f8f8f8;
			transition: all 0.3s ease;
			margin-bottom: 0rpx;

			img {
				width: 100%;
				height: 100%;
			}
		}

		.box {
			display: flex;

			.left {
				width: 160rpx;
				height: 100%;
				background: #F5F7F7;

				.menu {
					width: 160rpx;
					height: 88rpx;
					background: #F5F7F7;
					border-radius: 0rpx;
					font-size: 24rpx;
					text-align: center;
					line-height: 88rpx;
					color: #909399;
				}

				.menu.active {
					background: #fff;
					color: #121212;
					font-size: 26rpx;
					font-weight: 600;
					position: relative;
				}

				.menu.active::before {
					content: '';
					position: absolute;
					top: 30rpx;
					left: 5rpx;
					width: 4rpx;
					height: 28rpx;
					background: #121212;
					border-radius: 10rpx;
				}
			}

			.right {
				flex: 1;

				.hotList {
					width: calc(100% - 60rpx);
					margin: 38rpx auto 0;

					.list {
						display: flex;
						align-items: center;
						justify-content: flex-start;
						margin-bottom: 32rpx;

						.img {
							width: 190rpx;
							height: 190rpx;
							border-radius: 10rpx;
							overflow: hidden;
							background: #f8f8f8f;

							img {
								width: 190rpx;
								height: 190rpx;
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
		}

		.bottomBox {
			width: 100%;
			position: fixed;
			bottom: 0;
			z-index: 99;
			.bottomCart {
				width: calc(100% - 60rpx);
				margin: 0 auto;
				padding: 0 30rpx;
				background: #FFFFFF;
				box-shadow: 0rpx 0rpx 8rpx 0rpx rgba(0, 0, 0, 0.06);
				border-radius: 48rpx;
				margin-bottom: 32rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.left {
					width: 55rpx;
					height: 75rpx;
					position: relative;
					margin-left: 34rpx;
					.brage {
						position: absolute;
						text-align: center;
						line-height: 30rpx;
						right: -20rpx;
						top: 0rpx;
						width: 30rpx;
						height: 30rpx;
						background: #FE5509;
						border: 2px solid #FFFFFF;
						border-radius: 50%;
						font-size: 20rpx;
						font-weight: 400;
						color: #FFFFFF;
					}
					img {
						width: 55rpx;
						height: 75rpx;
					}
				}
				.mid {
					flex: 1;
					text-align: left;
					margin-left: 33rpx;
					.price {
						font-size: 28rpx;
						font-weight: 600;
						color: #121212;
					}
					.des {
						font-size: 22rpx;
						font-weight: 400;
						color: #909399;
					}
				}
				.right {
					width: 160rpx;
					height: 88rpx;
					background: #121212;
					border-radius: 44rpx;
					font-size: 28rpx;
					font-weight: 400;
					color: #FFFFFF;
					text-align: center;
					line-height: 88rpx;
				}
			}
		}
	
		.maskBox {
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 100%;
			background: rgba(0,0,0, .75);
			z-index: 90;
			.maskRect {
				position: absolute;
				bottom: 0;
				max-height: 1200rpx;
				width: 100%;
				border-radius: 20rpx 20rpx 0 0;
				background: #fff;
				.topDeal {
					width: calc(100% - 60rpx);
					margin: 0 auto;
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding-top: 38rpx;
					.choiceAll {
						line-height: 40rpx;
						height: 40rpx;
						img {
							width: 40rpx;
							height: 40rpx;
							border-radius: 40rpx;
						}
					}
					.mid {
						flex: 1;
						text-align: left;
						margin-left: 22rpx;
						font-size: 28rpx;
						line-height: 28rpx;
						font-weight: 500;
						color: #121212;
					}
					.del {
						line-height: 26rpx;
						display: flex;
						font-size: 24rpx;
						align-items: center;
						color: #909399;
						img {
							width: 24rpx;
							height: 26rpx;
							margin-right: 4rpx;
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
							width: 150rpx;
							height: 150rpx;
							border-radius: 10rpx;
							overflow: hidden;
							background: #f8f8f8f;
							img {
								width: 150rpx;
								height: 150rpx;
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
	
	}
</style>