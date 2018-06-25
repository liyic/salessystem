
const router = require('koa-router')();
const monk = require('monk');
const url = '47.106.150.86:2018/data1';
const db = monk(url);
const collection = db.get('nav_table');
const main = require('../control/main');

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'welcome'
  })
})

router.post('/login', async (ctx, next) => {
    await main.login(ctx,next);
})
router.post('/modify_pwd', async (ctx, next) => {
    await main.modify_pwd(ctx,next);
})
router.post('/search_table', async (ctx, next) => {
    await main.search_table(ctx,next);
})
router.post('/apply_extension', async (ctx, next) => {
    await main.apply_extension(ctx,next);
})
router.post('/account_apply', async (ctx, next) => {
    await main.account_apply(ctx,next);
})
module.exports = router
