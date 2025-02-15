// export class ConfigDB {
// 	static data = {
// 		settings: {
// 			layout_type: 'ltr',
// 			sidebar: {
// 				wrapper: 'default',
// 				bodyWrapper: 'default'
// 			},
// 			sidebar_setting: 'default-sidebar',
// 			sidebar_backround: 'dark-sidebar'
// 		},
// 		color: {
// 			layout_version: 'light',
// 			color: 'light-1',
// 			primary_color: '#4466f2',
// 			secondary_color: '#1ea6ec',
// 			mix_layout: 'default'
// 		},
// 		router_animation: 'fadeIn'
// 	}
// }



export class ConfigDB {
	static data = {
		settings: {
			layout_type: 'ltr',
			sidebar: {
				type: '',
				body_type: ''
			},
			sidebar_setting: 'default-sidebar',
			sidebar_backround: 'dark-sidebar'
		},
		color: {
			layout_version: 'light',
			color: 'light-1',
			primary_color: '#4466f2',
			secondary_color: '#1ea6ec',
			mix_layout: 'light-only'
		},
		router_animation: 'fadeIn'
	}
}


export default ConfigDB;

