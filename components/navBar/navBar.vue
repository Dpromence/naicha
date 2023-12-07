<template>
	<view class="navBar" :style="{height: navBarHeight+'px'}" :catchtouchmove="true">
		<view class="" :style="{height: iStatusBarHeight+'px', 'margin-top': titleTop+'px'}"></view>
		<view class="box" :style="{height: titleHeight+'px'}">
			<view class="back" v-if="leftIcon && !indexState" @tap="back">
				<img class="backIcon" v-if="!dark" src="./imgs/back.png" alt="">
				<img class="backIcon white" v-else src="./imgs/backWhite.png" alt="">
			</view>
			<view class="back" v-if="leftIcon && indexState" @tap="back">
				<img class="backIcon" style="width: 36rpx;height: 36rpx;" v-if="!dark" src="./imgs/index.png" alt="">
				<img class="backIcon white" style="width: 36rpx;height: 36rpx;" v-else src="./imgs/indexWhite.png" alt="">
			</view>
			<view class="title" :class="[!dark?'':'white']">
				{{title?title:''}}
			</view>
			<!-- <view class="" style="width: 80rpx;"></view> -->
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ''
			},
			dark: {
				type: Boolean,
				default: true
			},
			leftIcon: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				indexState: false,
				iStatusBarHeight: 0,
				navBarHeight: 0,
				titleHeight: 0,
				titleTop: 0
			}
		},
		onLoad() {
		
		},
		created() {
			let pages = getCurrentPages()
			if (pages.length <= 1) {
				this.indexState = true
			}
			this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight
			this.titleHeight = wx.getMenuButtonBoundingClientRect().height
			this.titleTop = wx.getMenuButtonBoundingClientRect().top - uni.getSystemInfoSync().statusBarHeight
			this.navBarHeight = wx.getMenuButtonBoundingClientRect().height + wx.getMenuButtonBoundingClientRect().top + 5
		},
		methods: {
			back() {
				let pages = getCurrentPages()
				if (pages.length <= 1) {
					uni.navigateTo({
						url: '/pages/index/index'
					})
					return
				}
				// let prevPage = pages[pages.length - 2]
				// prevPage.$vm.getValue(this.list)
				uni.navigateBack({
					delta: 1 // 返回的页面数
				})
			}
		}
	}
</script>

<style lang="scss">
	.navBar {
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 98;

		.box {
			width: calc(100% - 40rpx);
			margin: 0 auto;
			display: flex;
			align-items: center;
			justify-content: flex-start;

			.back {
				width: 80rpx;
				height: 88rpx;
				display: flex;
				align-items: center;

				.backIcon {
					width: 22rpx;
					height: 36rpx;
				}
			}

			.title {
				font-size: 32rpx;
				line-height: 34rpx;
				text-align: center;
				width: calc(100% );
				color: #121212;
				font-weight: 600;
			}
		}

	}
</style>