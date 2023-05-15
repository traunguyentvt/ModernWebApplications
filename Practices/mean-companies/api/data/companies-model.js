const mongoose= require("mongoose");

const personSchema= mongoose.Schema({
    is_past: Boolean,
    title: String,
    person: {
        first_name: String,
        last_name: String,
        permalink: String
    }
});

const officeSchema= mongoose.Schema({
    address1: String,
    address2: String,
    zip_code: String,
    city: String,
    state_code: String,
    country_code: String,
});

const companySchema= mongoose.Schema({
    name: String,
    permalink: String,
    homepage_url: String,
    blog_url: String,
    blog_feed_url: String,
    twitter_username: String,
    category_code: String,
    number_of_employees: Number,
    founded_year: Number,
    founded_month: Number,
    founded_day: Number,
    tag_list: [String],
    alias_list: [String],
    email_address: String,
    phone_number: String,
    description: String,
    overview: String,
    relationships: [personSchema],
    total_money_raised: Number,
    offices: [officeSchema]
});

mongoose.model(process.env.COMPANY_MODEL, companySchema, process.env.DB_COMPANIES_COLLECTION)