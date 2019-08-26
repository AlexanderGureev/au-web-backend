import { createParamDecorator } from '@nestjs/common'

export const CustomReq = createParamDecorator(
  (data, [root, args, ctx, info]) => {
    return ctx.req
  },
)
