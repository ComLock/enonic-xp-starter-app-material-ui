import {getHeadBegin, getBodyEnd} from '/lib/material-ui';
//import {toStr} from '/lib/enonic/util';
import {sanitize} from '/lib/xp/common';
import {getComponent} from '/lib/xp/portal';


function getChild(name) {
	if (name === 'add') { return "React.createElement('path', {d: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'})"; }
	return '';
}


export function get(/*request*/) {
	//log.info(toStr({request}));
	const {config, path} = getComponent();
	const {
		iconName,
		color,
		fontSize,
		nativeColor,
		titleAccess,
		viewBox
	} = config;
	const props = {
		color,
		fontSize,
		nativeColor,
		titleAccess,
		viewBox
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
		window["material-ui"]["SvgIcon"],
		${JSON.stringify(props)},
		${getChild(iconName)}
	),
	document.getElementById('${id}')
);
</script>`.replace(/\n[\t ]*/g, ''))
		}
	};
}
