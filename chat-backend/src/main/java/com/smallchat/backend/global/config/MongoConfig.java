package com.smallchat.backend.global.config;

import com.smallchat.backend.global.config.converter.ZonedDateTimeReadConverter;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;
import org.springframework.data.mongodb.core.convert.MongoCustomConversions;

@Configuration
@AllArgsConstructor
public class MongoConfig extends AbstractMongoClientConfiguration {

    private static final String DATABASE_NAME = "small_chat";
    private ZonedDateTimeReadConverter zonedDateTimeReadConverter;

    @Override
    protected String getDatabaseName() {
        return DATABASE_NAME;
    }

    @Override
    protected void configureConverters(MongoCustomConversions.MongoConverterConfigurationAdapter adapter) {
        adapter.registerConverter(zonedDateTimeReadConverter);
    }
}
