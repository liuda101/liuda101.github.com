---
layout: post
title: Backbone Collection 数据获取流程
firstLetter : B
---

<p>
	Backbone.Collection 类有一个fetch方法，用来从某个数据源获取数据。为了适配各种数据源类型，fetch方法提供了许多可选参数，下面一一介绍。
</p>
<p>
	1. parse <br />
	布尔类型，要传递给$.ajax方法，查了一下jQuery的文档，发现$.ajax并没有该参数啊！而且不管我传入true还是false，丝毫不见影响啊！！
</p>
<p>
	2. success <br />
	Function类型，请求成功之后的回调函数。Collection内部会包装此函数，从而使请求成功之后可以触发Collection自身的add或者reset事件。
</p>
<p>
	3. add <br />
	布尔类型，请求成功之后触发的事件类型。如果为true，则触发add事件；如果为false，则触发reset事件。
</p>
<p>
	4. sync <br />
	Function类型，用来覆盖Backbone.sync。Collection默认会使用Backbone.sync来获取数据，如果想覆盖掉某一个获取数据的方法，可以传入此参数。
	当然，如果需要替换所有Collection的数据获取方法，直接修改或覆盖Backbone.sync即可。
</p>
