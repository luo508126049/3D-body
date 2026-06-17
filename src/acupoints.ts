export type Meridian =
  | '督脉'
  | '任脉'
  | '手太阴肺经'
  | '足阳明胃经'
  | '手阳明大肠经'
  | '足太阳膀胱经';

export type Acupoint = {
  id: string;
  name: string;
  code: string;
  pinyin: string;
  meridian: Meridian;
  region: string;
  location: string;
  indications: string[];
  position: [number, number, number];
  color: string;
};

export const meridians: Meridian[] = [
  '督脉',
  '任脉',
  '手太阴肺经',
  '手阳明大肠经',
  '足阳明胃经',
  '足太阳膀胱经',
];

export const acupoints: Acupoint[] = [
  {
    id: 'gv20',
    name: '百会',
    code: 'GV20',
    pinyin: 'Baihui',
    meridian: '督脉',
    region: '头顶',
    location: '头顶正中线，前发际正中直上 5 寸。',
    indications: ['头痛', '眩晕', '失眠', '健忘'],
    position: [0, 2.55, 0.05],
    color: '#ffd166',
  },
  {
    id: 'gv26',
    name: '水沟',
    code: 'GV26',
    pinyin: 'Shuigou',
    meridian: '督脉',
    region: '面部',
    location: '人中沟上 1/3 与中 1/3 交点处。',
    indications: ['昏厥', '中暑', '面肿', '腰脊强痛'],
    position: [0, 2.18, 0.23],
    color: '#ffd166',
  },
  {
    id: 'cv17',
    name: '膻中',
    code: 'CV17',
    pinyin: 'Danzhong',
    meridian: '任脉',
    region: '胸部',
    location: '前正中线上，平第 4 肋间，两乳头连线中点。',
    indications: ['胸闷', '咳嗽', '气喘', '乳少'],
    position: [0, 1.35, 0.28],
    color: '#4cc9f0',
  },
  {
    id: 'cv6',
    name: '气海',
    code: 'CV6',
    pinyin: 'Qihai',
    meridian: '任脉',
    region: '腹部',
    location: '前正中线上，脐下 1.5 寸。',
    indications: ['腹痛', '泄泻', '月经不调', '虚劳'],
    position: [0, 0.72, 0.29],
    color: '#4cc9f0',
  },
  {
    id: 'lu1',
    name: '中府',
    code: 'LU1',
    pinyin: 'Zhongfu',
    meridian: '手太阴肺经',
    region: '胸肩',
    location: '胸前外上方，云门下 1 寸，平第 1 肋间隙。',
    indications: ['咳嗽', '气喘', '胸痛', '肩背痛'],
    position: [-0.44, 1.52, 0.25],
    color: '#ef476f',
  },
  {
    id: 'lu7',
    name: '列缺',
    code: 'LU7',
    pinyin: 'Lieque',
    meridian: '手太阴肺经',
    region: '前臂',
    location: '桡骨茎突上方，腕横纹上 1.5 寸。',
    indications: ['头项强痛', '咳嗽', '咽喉痛', '腕痛'],
    position: [-0.96, 0.9, 0.14],
    color: '#ef476f',
  },
  {
    id: 'li4',
    name: '合谷',
    code: 'LI4',
    pinyin: 'Hegu',
    meridian: '手阳明大肠经',
    region: '手背',
    location: '第 2 掌骨桡侧中点处。',
    indications: ['头痛', '牙痛', '鼻塞', '发热'],
    position: [1.15, 0.55, 0.12],
    color: '#06d6a0',
  },
  {
    id: 'li11',
    name: '曲池',
    code: 'LI11',
    pinyin: 'Quchi',
    meridian: '手阳明大肠经',
    region: '肘部',
    location: '屈肘，肘横纹外侧端与肱骨外上髁连线中点。',
    indications: ['热病', '上肢不遂', '皮肤瘙痒', '咽痛'],
    position: [0.86, 1.08, 0.14],
    color: '#06d6a0',
  },
  {
    id: 'st36',
    name: '足三里',
    code: 'ST36',
    pinyin: 'Zusanli',
    meridian: '足阳明胃经',
    region: '小腿',
    location: '犊鼻下 3 寸，胫骨前嵴外 1 横指。',
    indications: ['胃痛', '呕吐', '腹胀', '下肢痿痹'],
    position: [0.24, -0.92, 0.19],
    color: '#f77f00',
  },
  {
    id: 'st25',
    name: '天枢',
    code: 'ST25',
    pinyin: 'Tianshu',
    meridian: '足阳明胃经',
    region: '腹部',
    location: '脐中旁开 2 寸。',
    indications: ['腹痛', '腹胀', '便秘', '泄泻'],
    position: [0.28, 0.88, 0.29],
    color: '#f77f00',
  },
  {
    id: 'bl23',
    name: '肾俞',
    code: 'BL23',
    pinyin: 'Shenshu',
    meridian: '足太阳膀胱经',
    region: '腰背',
    location: '第 2 腰椎棘突下，旁开 1.5 寸。',
    indications: ['腰痛', '耳鸣', '遗尿', '月经不调'],
    position: [-0.24, 0.65, -0.26],
    color: '#90e0ef',
  },
  {
    id: 'bl40',
    name: '委中',
    code: 'BL40',
    pinyin: 'Weizhong',
    meridian: '足太阳膀胱经',
    region: '膝后',
    location: '腘横纹中点。',
    indications: ['腰背痛', '下肢痿痹', '腹痛', '吐泻'],
    position: [-0.18, -0.62, -0.19],
    color: '#90e0ef',
  },
];

export const searchAcupoints = (query: string, selected: Meridian[]) => {
  const keyword = query.trim().toLowerCase();
  return acupoints.filter((point) => {
    const inMeridian = selected.length === 0 || selected.includes(point.meridian);
    const text = [
      point.name,
      point.code,
      point.pinyin,
      point.meridian,
      point.region,
      point.location,
      point.indications.join(' '),
    ]
      .join(' ')
      .toLowerCase();
    return inMeridian && (!keyword || text.includes(keyword));
  });
};
