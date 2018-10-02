import {getHeadBegin, getBodyEnd} from '/lib/material-ui';
//import {toStr} from '/lib/enonic/util';
import {sanitize} from '/lib/xp/common';
import {getComponent} from '/lib/xp/portal';


export function get(/*request*/) {
	//log.info(toStr({request}));
	const {config, path} = getComponent();
	const {
		color,
		disabled, // = false,
		disableFocusRipple, // = false,
		disableRipple, // = false,
		fullWidth, // = false,
		href,
		mini, // = false,
		size,
		text = '',
		variant
	} = config;
	const props = {
		color,
		disabled,
		disableFocusRipple,
		disableRipple,
		fullWidth,
		href,
		mini,
		size,
		text,
		variant
	};
	const id = sanitize(path);
	return {
		body: `<div id="${id}"></div>`,
		contentType: 'text/html; charset=utf-8',
		pageContributions: {
			headBegin: getHeadBegin(),
			bodyEnd: getBodyEnd().concat(`<script type="text/javascript">
ReactDOM.render(
	React.createElement(
		window["material-ui"]["Button"],
		${JSON.stringify(props)},
		'${text}'
	),
	document.getElementById('${id}')
);
</script>`.replace(/\n[\t ]*/g, ''))
		}
	};
}
