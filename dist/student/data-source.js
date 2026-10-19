// Replace this module with an authenticated adapter when a real student system is approved.
// Contract: getSnapshot() returns { student, courses, assignments, schedule, submissions };
// submitPractice({ assignmentId, choiceIndex }) returns a result and never accepts files here.
// The demo sends no requests and keeps results in memory until this tab is refreshed.

const student = {
  id: 'demo-student-001',
  name: { en: 'Alex Chen', zh: '陈同学（示例）' },
  level: { en: 'Year 10', zh: '10 年级' },
  campus: { en: 'Mansfield State High School (rented venue)', zh: 'Mansfield State High School（租用场地）' },
  status: { en: 'Fictional learner profile', zh: '虚构学生档案' }
};

const courses = [
  { id:'methods', code:'MTH-10', title:{en:'Mathematical Methods',zh:'数学方法'}, description:{en:'Functions, calculus foundations and careful interpretation.',zh:'函数、微积分基础与严谨的结果解释。'}, progress:72, score:78, lessons:8, next:{en:'Functions and rates of change',zh:'函数与变化率'} },
  { id:'specialist', code:'SPM-10', title:{en:'Specialist Mathematics',zh:'专业数学'}, description:{en:'Vectors, reasoning and connected mathematical ideas.',zh:'向量、数学推理与知识之间的联系。'}, progress:58, score:82, lessons:8, next:{en:'Vectors in two dimensions',zh:'二维向量'} },
  { id:'foundations', code:'FND-10', title:{en:'Problem Solving Studio',zh:'解题训练'}, description:{en:'Explain a method, check an answer and learn from feedback.',zh:'说明方法、核查结果，并根据反馈改进。'}, progress:84, score:86, lessons:6, next:{en:'Interpreting a graph',zh:'解读函数图像'} }
];

const assignments = [
  { id:'rates', courseId:'methods', due:'2026-10-24', title:{en:'Rates of change · practice',zh:'变化率互动练习'}, description:{en:'Select the derivative of f(x) = 3x² + 2x.',zh:'选择 f(x) = 3x² + 2x 的导数。'}, question:{en:'What is f′(x)?',zh:'f′(x) 等于多少？'}, choices:[{en:'6x + 2',zh:'6x + 2'},{en:'3x + 2',zh:'3x + 2'},{en:'6x² + 2',zh:'6x² + 2'}], answer:0, explanation:{en:'Differentiate each term: the derivative of 3x² is 6x and the derivative of 2x is 2.',zh:'逐项求导：3x² 的导数是 6x，2x 的导数是 2。'} },
  { id:'vectors', courseId:'specialist', due:'2026-10-31', title:{en:'Vector addition · practice',zh:'向量加法互动练习'}, description:{en:'Combine two displacement vectors by components.',zh:'按分量合成两个位移向量。'}, question:{en:'If a = (2, 1) and b = (−1, 3), what is a + b?',zh:'若 a = (2, 1)，b = (−1, 3)，a + b 等于多少？'}, choices:[{en:'(1, 4)',zh:'(1, 4)'},{en:'(3, −2)',zh:'(3, −2)'},{en:'(−2, 3)',zh:'(−2, 3)'}], answer:0, explanation:{en:'Add matching components: (2 + −1, 1 + 3) = (1, 4).',zh:'对应分量相加：(2 + −1, 1 + 3) = (1, 4)。'} },
  { id:'graphs', courseId:'foundations', due:'2026-11-07', title:{en:'Reading graphs · practice',zh:'图像解读互动练习'}, description:{en:'Connect a graph feature to its meaning.',zh:'把图像特征与实际意义联系起来。'}, question:{en:'On a distance–time graph, what does a horizontal segment mean?',zh:'在距离—时间图像中，水平线段表示什么？'}, choices:[{en:'Distance is not changing',zh:'距离没有变化'},{en:'Speed is increasing',zh:'速度正在增加'},{en:'Distance is negative',zh:'距离是负数'}], answer:0, explanation:{en:'A horizontal segment has no change in distance over that interval.',zh:'水平线段表示该时间段内距离没有变化。'} }
];

const schedule = [
  {date:'2026-10-24',time:'1:30–3:00 pm',courseId:'methods',topic:{en:'Functions and rates',zh:'函数与变化率'}},
  {date:'2026-10-31',time:'3:15–4:45 pm',courseId:'specialist',topic:{en:'Vector reasoning',zh:'向量推理'}},
  {date:'2026-11-07',time:'1:30–3:00 pm',courseId:'methods',topic:{en:'Interpreting derivatives',zh:'导数的意义'}}
];

export function createDemoDataSource() {
  const submissions = new Map();
  return {
    mode: 'demo',
    async getSnapshot() {
      return structuredClone({student,courses,assignments,schedule,submissions:Object.fromEntries(submissions)});
    },
    async submitPractice({assignmentId,choiceIndex}) {
      const assignment = assignments.find(item => item.id === assignmentId);
      if (!assignment || !Number.isInteger(choiceIndex) || choiceIndex < 0 || choiceIndex >= assignment.choices.length) {
        throw new Error('Invalid demo practice response');
      }
      const result = {assignmentId,choiceIndex,correct:choiceIndex === assignment.answer,submittedAt:new Date().toISOString()};
      submissions.set(assignmentId,result);
      return structuredClone(result);
    }
  };
}

export const dataSource = createDemoDataSource();
