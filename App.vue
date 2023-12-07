<script>
	export default {
		globalData: {
			isFullSucreen: false
		},
		onLaunch() {
			uni.setStorageSync('navBarHeight', (wx.getMenuButtonBoundingClientRect().height + wx.getMenuButtonBoundingClientRect().top + 5)*2)
			uni.setStorageSync('isFullSucreen', false)
			uni.setStorageSync('sucreenHeight', (wx.getMenuButtonBoundingClientRect().height + wx.getMenuButtonBoundingClientRect().top + 5)*2+120)
			uni.setStorageSync('buttomMenuHeight', 120)
			wx.getSystemInfo({
				success: res => {
					// 根据 屏幕高度 进行判断
					if (res.screenHeight - res.safeArea.height > 40) {
						uni.setStorageSync('isFullSucreen', true)
						uni.setStorageSync('buttomMenuHeight', 180)
						uni.setStorageSync('sucreenHeight', (wx.getMenuButtonBoundingClientRect().height + wx.getMenuButtonBoundingClientRect().top + 5)*2+180)
					}
				}
			})
		},
		onShow() {
			console.log('App Show')
		},
		onHide() {
			console.log('App Hide')
		},
		methods:{
			 
		}
	}
</script>

<style>
	scroll-view ::-webkit-scrollbar {
	    display: none;
	    width: 0;
	    height: 0;
	    color: transparent;
	}
	/*每个页面公共css */
</style>
