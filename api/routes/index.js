
const router = require('koa-router')();
const monk = require('monk');
const url = '47.106.150.86:2018/data1';
const db = monk(url);
const collection = db.get('nav_table');
const user_manager = require('../control/user_manager');
const sales_log = require('../control/sales_log');

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'welcome'
  })
})

router.post('/login', async (ctx, next) => {
    await user_manager.login(ctx,next);
})
router.post('/modify_pwd', async (ctx, next) => {
    await user_manager.modify_pwd(ctx,next);
})
router.post('/search_table', async (ctx, next) => {
    await user_manager.search_table(ctx,next);
})
router.post('/apply_extension', async (ctx, next) => {
    await user_manager.apply_extension(ctx,next);
})
router.post('/account_apply', async (ctx, next) => {
    await user_manager.account_apply(ctx,next);
})
router.post('/log_list', async (ctx, next) => {
    await sales_log.log_list(ctx,next);
})
router.post('/add_user', async (ctx, next) => {
    await sales_log.add_user(ctx,next);
})
router.post('/write_log', async (ctx, next) => {
    await sales_log.write_log(ctx,next);
})
router.post('/search_customer', async (ctx, next) => {
    await sales_log.search_customer(ctx,next);
})
router.post('/statistics_log', async (ctx, next) => {
    await sales_log.statistics_log(ctx,next);
})
router.post('/statistics_chart', async (ctx, next) => {
    await sales_log.statistics_chart(ctx,next);
})
module.exports = router
