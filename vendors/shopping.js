/**
 * ========================================= 小游戏畅玩卡
 */
export const CHANGWANKA = { id: 10243, price: 99 };
export const CHANGWANKATASK = [
  {
    taskid: 21322,
    text: '在财神消消乐中累计赢金1000万',
    total: 10000000,
    award: 1,
    type: 'csxxl',
  },
  {
    taskid: 21323,
    text: '在水浒消消乐中累计赢金1000万',
    total: 10000000,
    award: 1,
    type: 'shxxl',
  },
  {
    taskid: 21324,
    text: '在水果消消乐中累计赢金1000万',
    total: 10000000,
    award: 1,
    type: 'xxl',
  },
  {
    taskid: 21325,
    text: '在苹果大战中累计纯赢1000万',
    total: 10000000,
    award: 1,
    type: 'zpg',
  },
  {
    taskid: 21326,
    text: '在街机捕鱼中累计消耗1000万',
    total: 10000000,
    award: 1,
    type: 'by',
  },
  {
    taskid: 21327,
    text: '在疯狂捕鱼中累计消耗1000万',
    total: 10000000,
    award: 1,
    type: 'fkby',
  },
  {
    taskid: 21328,
    text: '在弹弹乐中累计赢金1000万',
    total: 10000000,
    award: 1,
    type: 'ttl',
  },
  {
    taskid: 21329,
    text: '在敲敲乐中累计赢金1000万',
    total: 10000000,
    award: 1,
    type: 'qql',
  },
  {
    taskid: 21330,
    text: '在敲敲乐财神模式中累计赢金1000万',
    total: 10000000,
    award: 1,
    type: 'qql_cs',
  },
  {
    taskid: 21331,
    text: '苹果大战中累计纯赢8000万',
    total: 80000000,
    award: 4,
    type: 'zpg',
  },
  {
    taskid: 21332,
    text: '苹果大战使用500万及以上档次，种出1次金苹果',
    total: 1,
    award: 4,
    type: 'zpg',
  },
  {
    taskid: 21333,
    text: '街机捕鱼使用10万以上炮倍击杀一条黄金龙',
    total: 1,
    award: 4,
    type: 'by',
  },
  {
    taskid: 21334,
    text: '敲敲乐财神模式中累计赢金8000万',
    total: 80000000,
    award: 4,
    type: 'qql_cs',
  },
  {
    taskid: 21335,
    text: '弹弹乐中累计赢金8000万',
    total: 80000000,
    award: 4,
    type: 'ttl',
  },
  {
    taskid: 21336,
    text: '水果消消乐使用48万及以上档次，出现1次幸运时刻',
    total: 1,
    award: 4,
    type: 'xxl',
  },
  {
    taskid: 21337,
    text: '水浒消消乐中累计赢金8000万',
    total: 80000000,
    award: 4,
    type: 'shxxl',
  },
  {
    taskid: 21338,
    text: '财神消消乐使用96万以上档次，打出1次天女散花',
    total: 1,
    award: 4,
    type: 'csxxl',
  },
  {
    taskid: 21339,
    text: '敲敲乐使用10万及以上档次，敲出2次38倍财神',
    total: 2,
    award: 4,
    type: 'qql',
  },
];

/**
 * ========================================= 豪华月卡
 */
export const HHYUEKA = { id: 10235, price: 48 };

/**
 * ========================================= 尊享月卡
 */
export const ZXYUEKA = { id: 10236, price: 96 };

/**
 * ========================================= 系统升级奖励ID
 */
export const SYSTEM_UPGRADE = 1000351;

/**
 * ========================================= 三元福利礼包
 */
export const SANYUANLIBAO = { id: 10, price: 3 };

/**
 * ========================================= 周卡
 */
export const ZHOUKA = { id: 10436, price: 10 };

/**
 * ========================================= 至尊季卡
 */
export const ZHIZUNJIKA = { id: 10168, price: 198 };

/**
 * ========================================= 每日特惠
 *
 * 根据vip等级展示相应的档次
 */
export const MEIRITEHUI = [
  [
    {
      id: 10239,
      price: 6,
      desc: [
        { text: '30万', icon: 'ty_icon_jb_498y' },
        { text: '40万', icon: 'ty_icon_jb_30y' },
        { text: '5万', icon: 'ty_icon_yxb_2' },
      ],
    },
    {
      id: 10240,
      price: 48,
      desc: [
        { text: '240万', icon: 'ty_icon_jb_998y' },
        { text: '260万', icon: 'ty_icon_jb_50y' },
        { text: '10万', icon: 'ty_icon_yxb_2' },
      ],
    },
    {
      id: 10241,
      price: 98,
      desc: [
        { text: '490万', icon: 'ty_icon_jb_2498y' },
        { text: '520万', icon: 'ty_icon_jb_198y' },
        { text: '20万', icon: 'ty_icon_yxb_2' },
      ],
    },
  ],
  [
    {
      id: 10087,
      price: 1,
      desc: [
        { text: '5万', icon: 'ty_icon_jb_498y' },
        { text: '15万', icon: 'ty_icon_jb_30y' },
        { text: '1', icon: 'prop_3d_fish_lock' },
      ],
    },
    {
      id: 10088,
      price: 3,
      desc: [
        { text: '15万', icon: 'ty_icon_jb_998y' },
        { text: '35万', icon: 'ty_icon_jb_50y' },
        { text: '2', icon: 'prop_3d_fish_lock' },
      ],
    },
    {
      id: 10089,
      price: 6,
      desc: [
        { text: '30万', icon: 'ty_icon_jb_2498y' },
        { text: '60万', icon: 'ty_icon_jb_198y' },
        { text: '3', icon: 'prop_3d_fish_lock' },
      ],
    },
  ],
  [
    {
      id: 10090,
      price: 6,
      desc: [
        { text: '30万', icon: 'ty_icon_jb_498y' },
        { text: '50万', icon: 'ty_icon_jb_30y' },
        { text: '3', icon: 'prop_3d_fish_lock' },
      ],
    },
    {
      id: 10091,
      price: 10,
      desc: [
        { text: '50万', icon: 'ty_icon_jb_998y' },
        { text: '70万', icon: 'ty_icon_jb_50y' },
        { text: '10万', icon: 'ty_icon_yxb_2' },
      ],
    },
    {
      id: 10092,
      price: 18,
      desc: [
        { text: '90万', icon: 'ty_icon_jb_2498y' },
        { text: '110万', icon: 'ty_icon_jb_198y' },
        { text: '20万', icon: 'ty_icon_yxb_4' },
      ],
    },
  ],
  [
    {
      id: 10093,
      price: 18,
      desc: [
        { text: '90万', icon: 'ty_icon_jb_498y' },
        { text: '100万', icon: 'ty_icon_jb_30y' },
        { text: '10万', icon: 'ty_icon_yxb_2' },
      ],
    },
    {
      id: 10094,
      price: 48,
      desc: [
        { text: '240万', icon: 'ty_icon_jb_998y' },
        { text: '260万', icon: 'ty_icon_jb_50y' },
        { text: '10万', icon: 'ty_icon_yxb_4' },
      ],
    },
    {
      id: 10095,
      price: 98,
      desc: [
        { text: '490万', icon: 'ty_icon_jb_2498y' },
        { text: '520万', icon: 'ty_icon_jb_198y' },
        { text: '20万', icon: 'ty_icon_yxb_5' },
      ],
    },
  ],
  [
    {
      id: 10096,
      price: 48,
      desc: [
        { text: '240万', icon: 'ty_icon_jb_498y' },
        { text: '260万', icon: 'ty_icon_jb_30y' },
        { text: '10万', icon: 'ty_icon_yxb_2' },
      ],
    },
    {
      id: 10097,
      price: 88,
      desc: [
        { text: '490万', icon: 'ty_icon_jb_998y' },
        { text: '520万', icon: 'ty_icon_jb_50y' },
        { text: '20万', icon: 'ty_icon_yxb_4' },
      ],
    },
    {
      id: 10098,
      price: 198,
      desc: [
        { text: '990万', icon: 'ty_icon_jb_2498y' },
        { text: '1070万', icon: 'ty_icon_jb_198y' },
        { text: '30万', icon: 'ty_icon_yxb_5' },
      ],
    },
  ],
  [
    {
      id: 10099,
      price: 98,
      desc: [
        { text: '490万', icon: 'ty_icon_jb_498y' },
        { text: '520万', icon: 'ty_icon_jb_30y' },
        { text: '20万', icon: 'ty_icon_yxb_2' },
      ],
    },
    {
      id: 10100,
      price: 198,
      desc: [
        { text: '990万', icon: 'ty_icon_jb_998y' },
        { text: '1070万', icon: 'ty_icon_jb_50y' },
        { text: '30万', icon: 'ty_icon_yxb_4' },
      ],
    },
    {
      id: 10101,
      price: 498,
      desc: [
        { text: '2490万', icon: 'ty_icon_jb_2498y' },
        { text: '2640万', icon: 'ty_icon_jb_198y' },
        { text: '50万', icon: 'ty_icon_yxb_5' },
      ],
    },
  ],
];

/**
 * ========================================= 一本万利
 */
export const YIBENWANLI = [
  {
    id: 10391,
    price: 2498,
    name: '荣耀礼包',
    taskid: 1000107,
    handsel: '2.5亿',
    neednum: [20000000, 50000000, 100000000, 500000000, 1000000000, 3000000000, 5000000000],
    awards: [160000, 250000, 500000, 600000, 1000000, 2000000, 3000000],
  },
  {
    id: 10390,
    price: 998,
    name: '王者礼包',
    taskid: 1000106,
    handsel: '9980万',
    neednum: [10000000, 30000000, 50000000, 100000000, 300000000, 500000000, 1000000000],
    awards: [100000, 150000, 200000, 250000, 300000, 450000, 600000],
  },
  {
    id: 10389,
    price: 498,
    name: '星耀礼包',
    taskid: 1000105,
    handsel: '4980万',
    neednum: [5000000, 10000000, 20000000, 50000000, 100000000, 300000000, 600000000],
    awards: [45000, 75000, 80000, 150000, 200000, 250000, 300000],
  },
  {
    id: 10388,
    price: 198,
    name: '钻石礼包',
    taskid: 1000104,
    handsel: '1980万',
    neednum: [5000000, 10000000, 20000000, 50000000, 100000000, 200000000, 400000000],
    awards: [20000, 30000, 50000, 60000, 80000, 120000, 250000],
  },
  {
    id: 10387,
    price: 98,
    name: '铂金礼包',
    taskid: 1000103,
    handsel: '980万',
    neednum: [1000000, 5000000, 10000000, 20000000, 50000000, 100000000, 300000000],
    awards: [10000, 15000, 20000, 30000, 50000, 80000, 200000],
  },
  {
    id: 10386,
    price: 68,
    name: '黄金礼包',
    taskid: 1000102,
    handsel: '680万',
    neednum: [1000000, 5000000, 10000000, 30000000, 50000000, 80000000, 150000000],
    awards: [8000, 12000, 20000, 30000, 40000, 50000, 60000],
  },
  {
    id: 10385,
    price: 30,
    name: '白银礼包',
    taskid: 1000101,
    handsel: '300万',
    neednum: [500000, 1000000, 5000000, 10000000, 20000000, 50000000, 100000000],
    awards: [2000, 5000, 10000, 15000, 20000, 30000, 50000],
  },
  {
    id: 10384,
    price: 6,
    name: '青铜礼包',
    taskid: 1000100,
    handsel: '60万',
    neednum: [100000, 300000, 600000, 1000000, 5000000, 10000000, 50000000],
    awards: [1000, 2000, 3000, 4000, 5000, 6000, 40000],
  },
];

// ========================================= 首充礼包
export const SHOUCHONGLIBAO = {
  true: [
    {
      id: 10611,
      price: 6,
      count: 600000,
      icon: 'pay_icon_gold7',
      attach: [
        {
          icon: 'ty_icon_pms1',
          text: 'x1',
        },
        {
          icon: 'ty_icon_jb_50y',
          text: '15万-60万',
        },
      ],
    },
    {
      id: 10612,
      price: 10,
      count: 1000000,
      icon: 'pay_icon_gold8',
      attach: [
        {
          icon: 'ty_icon_pms2',
          text: 'x1',
        },
        {
          icon: 'ty_icon_jb_198y',
          text: '40万-100万',
        },
      ],
    },
    {
      id: 10613,
      price: 48,
      count: 4800000,
      icon: 'pay_icon_gold9',
      attach: [
        {
          icon: 'ty_icon_pms2',
          text: 'x3',
        },
        {
          icon: 'ty_icon_jb_498y',
          text: '200万-480万',
        },
      ],
    },
  ],
  false: [
    {
      id: 95,
      price: 1,
      count: 50000,
      icon: 'pay_icon_gold7',
      attach: [
        {
          icon: 'ty_icon_jb_50y',
          text: 'x2',
        },
        {
          icon: 'ty_icon_jb_50y',
          text: '5.2万-20万',
        },
      ],
    },
    {
      id: 96,
      price: 10,
      count: 500000,
      icon: 'pay_icon_gold8',
      attach: [
        {
          icon: 'ty_icon_jb_198y',
          text: 'x20',
        },
        {
          icon: 'ty_icon_jb_198y',
          text: '55万-150万',
        },
      ],
    },
    {
      id: 99,
      price: 48,
      count: 2400000,
      icon: 'pay_icon_gold9',
      attach: [
        {
          icon: 'ty_icon_jb_498y',
          text: 'x200',
        },
        {
          icon: 'ty_icon_jb_498y',
          text: '260万-500万',
        },
      ],
    },
  ],
};

// ========================================= 全返礼包
export const QUANFANLIBAO = [
  {
    id: 10084,
    taskid: 78,
    price: 6,
    name: '周返',
    needProcess: 50000,
    content: '共领<b style="color: #fff950;">15万</b>金币+<b style="color: #fff950;">700</b>福利券',
    immediately: {
      icon: 'jingbi',
      text: '15万金币',
    },
    taskAwards: [
      {
        icon: 'fuliquan',
        text: '100福利券',
      },
      {
        icon: 'suoding',
        text: '锁定x1',
      },
    ],
  },
  {
    id: 10085,
    taskid: 79,
    price: 30,
    name: '月返',
    needProcess: 500000,
    content: '3D捕鱼中累计消耗<b style="color: #fff950;">50万</b>',
    immediately: {
      icon: 'jingbi',
      text: '100万金币',
    },
    taskAwards: [
      {
        icon: 'fuliquan',
        text: '100福利券',
      },
      {
        icon: 'ty_icon_jb_1y',
        text: '4万金币',
      },
      {
        icon: 'suoding',
        text: '锁定x1',
      },
    ],
  },
  {
    id: 10086,
    taskid: 80,
    price: 198,
    name: '季返',
    needProcess: 2000000,
    content: '共领<b style="color: #fff950;">1050万</b>金币+<b style="color: #fff950;">1.98万</b>福利券',
    immediately: {
      icon: 'jingbi',
      text: '600万金币',
    },
    taskAwards: [
      {
        icon: 'fuliquan',
        text: '220福利券',
      },
      {
        icon: 'ty_icon_jb_1y',
        text: '5万金币',
      },
      {
        icon: 'suoding',
        text: '锁定x1',
      },
    ],
  },
];
