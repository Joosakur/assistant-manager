package fi.helsinki.cs.joosakur.asmgr.rest.model.employer;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import fi.helsinki.cs.joosakur.asmgr.config.properties.AppConfig;
import org.apache.http.Consts;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
public class EmployerPostValidator implements Validator {

    @Autowired
    private AppConfig appConfig;

    @Override
    public boolean supports(Class<?> clazz) {
        boolean equals = EmployerPost.class.equals(clazz);
        return equals;
    }

    @Override
    public void validate(Object target, Errors errors) {
        String captcha = ((EmployerPost)target).getCaptcha();
        if(captcha == null) {
            errors.rejectValue("captcha", "captcha.null","Robot check failed");
            return;
        }

        CloseableHttpClient client = HttpClientBuilder.create().build();
        List<NameValuePair> params = new ArrayList<>();
        params.add(new BasicNameValuePair("secret", appConfig.getRecaptcha().getSecret()));
        params.add(new BasicNameValuePair("response", captcha));
        HttpPost request = new HttpPost("https://www.google.com/recaptcha/api/siteverify");
        request.setEntity(new UrlEncodedFormEntity(params, Consts.UTF_8));
        try {
            CloseableHttpResponse response = client.execute(request);
            String body = EntityUtils.toString(response.getEntity());
            System.out.println(body);

            boolean success = new Gson().fromJson(body, JsonElement.class)
                    .getAsJsonObject()
                    .getAsJsonPrimitive("success")
                    .getAsBoolean();

            if(!success)
                errors.rejectValue("captcha", "captcha.failed","Robot check failed");

        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}
