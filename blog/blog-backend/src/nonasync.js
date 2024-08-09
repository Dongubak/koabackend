const Koa = require('koa');

const app = new Koa();

// app.use(ctx => { /// ctx: context
//    /// next: 다음 미들웨어 호출함수
//    /// next호출을 하지 않은 경우 다음 미들웨어 호출 하지 않음
//    /// 주로 다음 미들웨어 처리가 필요없는 경우에 next를 호출하지
//    /// 않음

//    /// app.use에 등록되는 순서대로 미들웨어에 등록된다.
//    ctx.body = 'hello world';
// });

app.use((ctx, next) => {
   console.log(ctx.url);
   console.log(1);

   // next();

   /// 첫번째 미들웨어에서 next를 지우면
   /// 다음 미들웨어를 호출하지 않는다.

   if(ctx.query.authorized !== '1') {
      /// url : http://localhost:4000/?authorized=1이
      /// 아니면 미들웨어 호출 하지 않음
      ctx.status = 401;
      return;
   }

   next().then(() => {
      console.log('END');
   })
});

app.use((ctx, next) => {
   console.log(2);
   next();
});

app.use((ctx) => {
   ctx.body = 'hello world';
});

app.listen(4000, () => {
   console.log('Listening to port 4000');
});

