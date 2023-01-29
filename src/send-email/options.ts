export default function optionsSelectHTML() {
  const resetPassword = (email: string, code: number) => {
    const [name, domain] = email.split('@');
    const newemail = `${name![0]}${new Array(name!.length - 1).join(
      '*'
    )}${name!.charAt(name!.length - 1)}@${domain}`;
    return {
      subject: 'SimpleHealthPlan account password reset code',
      html: `<div><table dir="ltr">
      <tbody>
      <tr><td id="m_2043231930898860074m_5631031167402883454i2" style="font-weight: 500;padding:0;font-size: 32px;text-align:center">Reset Password</td></tr>
      <tr><td id="m_2043231930898860074m_5631031167402883454i3" style="padding:0;padding-top:25px;/* font-family:'Segoe UI',Tahoma,Verdana,Arial,sans-serif; */font-size: 17px;color:#2a2a2a">
                
                You have recently submitted a password reset request for your <a dir="ltr" id="m_2043231930898860074m_5631031167402883454iAccount" style="color:#2672ec;text-decoration:none" href="mailto:${newemail}" target="_blank">${newemail}</a>  account. If you didn't send this request, you can ignore this message.</td></tr>
      <tr><td id="m_2043231930898860074m_5631031167402883454i4" style="padding:0;padding-top:25px;font-size:14px;color:#2a2a2a"><div style="font-size: 23px;line-height:25px;color:#333;font-weight: bold;">${code}</div>
            </td></tr>
      
      <tr><td id="m_2043231930898860074m_5631031167402883454i6" style="padding:0;padding-top:25px;font-family:'Segoe UI',Tahoma,Verdana,Arial,sans-serif;font-size: 17px;color:#2a2a2a">Thanks,</td></tr>
      <tr><td id="m_2043231930898860074m_5631031167402883454i7" style="padding:0;font-family:'Segoe UI',Tahoma,Verdana,Arial,sans-serif;font-size: 17px;color:#2a2a2a">SimpleHealthPlan Support</td></tr>
</tbody></table><div class="yj6qo"></div><div class="adL"></div><div class="adL">
</div></div>`,
    };
  };
  return { resetPassword };
}
