const qlist = {
    motion: {
        status: {
            normal: {
                min: 0,
                max: 1,
                des: '您没有抑郁风险,请您继续保持。',
                title: '健康'
            },
            middle: {
                min: 2,
                max: 3,
                des: '您有轻度抑郁，请及时去医院检查。',
                title: '轻度'
            },
            high: {
                min: 4,
                max: 5,
                des: "您有中重度抑郁风险，请及时去医院检查。",
                title: '中重度'
            }
        },
        list: [
            {
                title: '你对生活基本上满意吗',
                ops: [
                    {
                        w: 0,
                        value: '是'
                    },
                    {
                        w: 1,
                        value: '否'
                    }
                ]
            },
            {
                title: '你对生活基本上满意吗',
                ops: [
                    {
                        w: 0,
                        value: '是'
                    },
                    {
                        w: 1,
                        value: '否'
                    }
                ]
            },
            {
                title: '你对生活基本上满意吗',
                ops: [
                    {
                        w: 0,
                        value: '是'
                    },
                    {
                        w: 1,
                        value: '否'
                    }
                ]
            },
            {
                title: '你对生活基本上满意吗',
                ops: [
                    {
                        w: 0,
                        value: '是'
                    },
                    {
                        w: 1,
                        value: '否'
                    }
                ]
            },
            {
                title: '你对生活基本上满意吗',
                ops: [
                    {
                        w: 0,
                        value: '是'
                    },
                    {
                        w: 1,
                        value: '否'
                    }
                ]
            },

        ]
    }
}


export default qlist;