import {getHeadBegin, getBodyEnd} from '/lib/material-ui';
//import {toStr} from '/lib/enonic/util';
import {forceArray} from '/lib/enonic/util/data';
import {request as clientRequest} from '/lib/http-client';
import {sanitize} from '/lib/xp/common';
import {componentUrl, getComponent} from '/lib/xp/portal';

export function get() {
	const {config, path, regions} = getComponent();
	//log.info(toStr({regions}));
	const id = sanitize(path);
	const {spacing} = config;
	const containerProps = {
		container: true,
		spacing
	};
	const items = config.items ? forceArray(config.items) : [];
	//log.info(toStr({items}));
	const children = items.map((item, i) => {
		//log.info(toStr({item}));
		const {
			alignContent,
			alignItems,
			direction,
			justify,
			ld,
			md,
			sm,
			wrap,
			xl,
			xs,
			zeroMinWidth
		} = item;
		const itemProps = {
			alignContent,
			alignItems,
			direction,
			item: true,
			justify,
			ld,
			md,
			sm,
			wrap,
			xl,
			xs,
			zeroMinWidth
		};
		const name = `gridItem${i + 1}`;
		const {components} = regions[name];
		const itemChildren = (components && components.length)
			? components.map((c) => {
				//log.info(toStr({c}));
				const res = clientRequest({
					auth: {
						user: 'su', // TODO WARNING Can't use this in a production setting...
						password: 'password'
					},
					url: componentUrl({
						component: c.path,
						type: 'absolute'
					})
				}); //log.info(toStr({res}));
				return res.body;
				//return `<!--# COMPONENT ${c.path} -->`;
			})
			: '';
		return `React.createElement(
			window["material-ui"]["Grid"],
			${JSON.stringify(itemProps)},
			React.createElement(
				'div',
				{
					dangerouslySetInnerHTML: {__html: '${itemChildren.join('\n')}'},
					'data-portal-region': '${name}'
				}
			)
		)`;
	});
	//log.info(toStr({children}));
	const script = `<script type="text/javascript">
ReactDOM.render(
	React.createElement(
		window["material-ui"]["Grid"],
		${JSON.stringify(containerProps)},
		[${children.join(', ')}]
	),
	document.getElementById('${id}')
);
</script>`;
	log.info(script);
	return {
		body: `<div id="${id}"></div>`,
		contentType: 'text/html; charset=utf-8',
		pageContributions: {
			headBegin: getHeadBegin(),
			bodyEnd: getBodyEnd().concat(script.replace(/\n[\t ]*/g, ''))
		}
	};
}
