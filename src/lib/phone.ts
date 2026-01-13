import Core from '@alicloud/pop-core';

// 延迟创建阿里云客户端实例
let client: Core | null = null;

function getClient(): Core {
  if (!client) {
    const accessKeyId = process.env.ALIYUN_ACCESS_KEY_ID;
    const accessKeySecret = process.env.ALIYUN_ACCESS_KEY_SECRET;

    if (!accessKeyId || !accessKeySecret) {
      throw new Error('阿里云 SMS 配置缺失，请设置 ALIYUN_ACCESS_KEY_ID 和 ALIYUN_ACCESS_KEY_SECRET');
    }

    client = new Core({
      accessKeyId,
      accessKeySecret,
      endpoint: 'https://dysmsapi.aliyuncs.com',
      apiVersion: '2017-05-25',
    });
  }
  return client;
}

// 发送手机验证码的函数
async function sendPhone(
  phoneNumber: string,
  code: string
): Promise<{ success: boolean; message: string; code?: string }> {
  const params = {
    PhoneNumbers: phoneNumber,
    SignName: process.env.ALIYUN_SMS_SIGN_NAME,
    TemplateCode: process.env.ALIYUN_SMS_TEMPLATE_CODE,
    TemplateParam: JSON.stringify({ code }),
  };

  const requestOption = {
    method: 'POST',
  };

  try {
    const result: any = await getClient().request('SendSms', params, requestOption);

    if (result.Code === 'OK') {
      // 在实际应用中，您应该将验证码保存到数据库或缓存中，而不是直接返回
      return { success: true, message: '验证码发送成功', code };
    } else {
      return { success: false, message: `发送失败: ${result.Message}` };
    }
  } catch (error) {
    console.error('发送验证码时出错:', error);
    return { success: false, message: '发送验证码时发生错误' };
  }
}

export default sendPhone;
