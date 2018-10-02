import {getHeadBegin, getBodyEnd} from '/lib/material-ui';
//import {toStr} from '/lib/enonic/util';
import {sanitize} from '/lib/xp/common';
import {getComponent} from '/lib/xp/portal';


export function get(/*request*/) {
	//log.info(toStr({request}));
	const {config, path} = getComponent();
	const {
		iconName,
		//classes,
		color,
		fontSize
	} = config;
	const props = {
		//classes,
		color,
		fontSize
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
		window["material-ui"]["Icon"],
		${JSON.stringify(props)},
		'${iconName}'
	),
	document.getElementById('${id}')
);
</script>`.replace(/\n[\t ]*/g, ''))
		}
	};
}
