package com.stripo.plugin.documents;

import kong.unirest.ContentType;
import kong.unirest.HttpRequestWithBody;
import kong.unirest.HttpResponse;
import kong.unirest.MultipartBody;
import kong.unirest.Unirest;
import lombok.extern.apachecommons.CommonsLog;
import org.apache.commons.io.IOUtils;
import org.apache.http.HttpHeaders;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

@CommonsLog
@Component
public class StripoRestClient {
    @Value("${api.url:}")
    private String apiUrl;
    @Value("${api.username:}")
    private String apiUsername;
    @Value("${api.password:}")
    private String apiPassword;
    @Value("${api.fileLocation:}")
    private String fileLocation;
    @Value("${api.contentType:}")
    private String contentType;
    @Value("${api.pluginKey:}")
    private String pluginKey;
    @Value("${api.pluginUiData:}")
    private String pluginUiData;
    @Value("${api.skipChunkedTransferEncoding:}")
    private boolean skipChunkedTransferEncoding;

    public void uploadImage() throws IOException {
        File initialFile = new File(fileLocation);
        log.info("File to upload: " + initialFile.getAbsolutePath());
        InputStream fileStream = new FileInputStream(initialFile);

        HttpRequestWithBody httpRequestWithBody = Unirest.post(apiUrl)
                .header(HttpHeaders.USER_AGENT, "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.11 (KHTML, like Gecko)" +
                        " Chrome/23.0.1271.95 Safari/537.11")
                .basicAuth(apiUsername, apiPassword);

        MultipartBody multipartBody;
        if (skipChunkedTransferEncoding) {
            byte[] bytes = IOUtils.toByteArray(fileStream);
            multipartBody = httpRequestWithBody
                    .multiPartContent()
                    .field("file", bytes, ContentType.create(contentType), initialFile.getName());
        } else {
            multipartBody = httpRequestWithBody
                    .field("file", fileStream, ContentType.create(contentType), initialFile.getName());
        }
        multipartBody = multipartBody
                .field("key", pluginKey)
				.header("plugin-key", pluginKey)
				.header("plugin-ui-data", pluginUiData)
                .header("plugin-locale", "en");

        HttpResponse<String> httpResponse = multipartBody.asString();
        log.info("Upload finished. Status: " + httpResponse.getStatus() + ", body: " + httpResponse.getBody());
    }
}
