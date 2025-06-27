import json
import random
import argparse
import calendar
from datetime import datetime

# Load appointment slots from JSON file
with open("src/database/appointmentSlots.json", "r") as file:
    appointment_slots = json.load(file)


def generate_user_details():
    first_names = [
        "John",
        "Jane",
        "Michael",
        "Emily",
        "Chris",
        "Sarah",
        "Robert",
        "Laura",
        "James",
        "Olivia",
    ]
    last_names = [
        "Doe",
        "Smith",
        "Johnson",
        "Brown",
        "Taylor",
        "Anderson",
        "Thomas",
        "Jackson",
        "White",
        "Harris",
    ]
    cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"]
    domains = ["example.com", "mail.com", "test.com", "randommail.com"]
    addresses = [
        "123 Elm Street",
        "456 Maple Avenue",
        "789 Oak Lane",
        "101 Pine Drive",
        "202 Cedar Road",
    ]
    zips = [f"{random.randint(10000, 99999)}" for _ in range(5)]

    first_name = random.choice(first_names)
    last_name = random.choice(last_names)
    name = f"{first_name} {last_name}"
    city = random.choice(cities)
    email = f"{first_name.lower()}.{last_name.lower()}{random.randint(100, 999)}@{random.choice(domains)}"
    address = random.choice(addresses)
    zip_code = random.choice(zips)

    return {
        "name": name,
        "email": email,
        "address": address,
        "city": city,
        "zip": zip_code,
    }


def generate_payment_details(user_name=None):
    expiry_date = f"{random.randint(1, 12):02}/{random.randint(23, 30):02}"
    return {
        "NameOnCard": user_name if user_name else "Card Holder",
        "cardNumber": "".join(str(random.randint(0, 9)) for _ in range(16)),
        "expiryDate": expiry_date,
        "cvv": f"{random.randint(100, 999)}",
    }


def generate_random_date_and_time():
    current_year = random.randint(2023, 2030)
    current_month = random.randint(1, 12)
    _, max_days_in_month = calendar.monthrange(current_year, current_month)

    available_days = [
        int(day)
        for day, times in appointment_slots["appointments"].items()
        if times and int(day) <= max_days_in_month
    ]

    if not available_days:
        return None, None, None

    random_day = random.choice(available_days)
    available_times = appointment_slots["appointments"].get(f"{random_day:02}", [])

    if not available_times:
        return None, None, None

    selected_time = random.choice(available_times)
    selected_date_result = datetime(current_year, current_month, random_day).strftime(
        "%d-%m-%Y"
    )
    selected_date_prompt = datetime(current_year, current_month, random_day).strftime(
        "%d %B, %Y"
    )

    return selected_date_prompt, selected_date_result, selected_time


def generate_random_price(prices=None):
    if prices is None:
        prices = [200, 200]
    return random.choice(prices)


def create_prompts_with_results(num_prompts, output_file):
    prompt_templates = [
        "Hi, I'd like to schedule a haircut on {selectedDate} at {selectedTime}. You can reach me at {email}. I am {name} from {city}, residing at {address}, {zipcode}. Payment will be handled using {NameOnCard}, card {cardNumber}, expiring {expiryDate}, CVV {cvv}.",
        "Hey, can you book a haircut for me on {selectedDate} at {selectedTime}? You can contact me via {email}. Name: {name}, staying in {city}, at {address}, {zipcode}. Payment will be processed with {NameOnCard}, card {cardNumber}, expiry {expiryDate}, CVV {cvv}.",
        "I'd like to request a haircut appointment on {selectedDate} at {selectedTime}. Contact via {email}. Name: {name}, based in {city}, at {address}, {zipcode}. Payment method: {NameOnCard}, card {cardNumber}, expiring {expiryDate}, CVV {cvv}.",
        "Please schedule a haircut for {selectedDate} at {selectedTime}. You can reach me at {email}. The booking is under {name}, located in {city}, address {address}, {zipcode}. Payment will be via {NameOnCard}, card {cardNumber}, expiry {expiryDate}, CVV {cvv}.",
        "Hello! I'd like to book a haircut on {selectedDate} at {selectedTime}. Contact at {email}. Booking for {name}, currently in {city}, residing at {address}, {zipcode}. Payment with {NameOnCard}, card {cardNumber}, exp {expiryDate}, CVV {cvv}.",
        "Can you arrange a haircut for {selectedDate} at {selectedTime}? Reach out at {email}. Client: {name}, based in {city}, staying at {address}, {zipcode}. Payment will be through {NameOnCard}, card {cardNumber}, expires {expiryDate}, CVV {cvv}.",
        "Hey there! I need a haircut scheduled for {selectedDate} at {selectedTime}. Email: {email}. This is for {name}, from {city}, at {address}, {zipcode}. Payment details: {NameOnCard}, card {cardNumber}, expiry {expiryDate}, CVV {cvv}.",
        "Hi! Please book a haircut service for {selectedDate} at {selectedTime}. You can contact via {email}. The appointment is for {name}, located in {city}, at {address}, {zipcode}. Payment will be handled via {NameOnCard}, card {cardNumber}, expires {expiryDate}, CVV {cvv}.",
        "I'd like to arrange a haircut appointment for {selectedDate} at {selectedTime}. You can reach me at {email}. The reservation is for {name}, currently staying in {city}, at {address}, {zipcode}. Payment using {NameOnCard}, card {cardNumber}, expiry {expiryDate}, CVV {cvv}.",
        "Hi, I need to book a haircut on {selectedDate} at {selectedTime}. Please contact me at {email}. Name: {name}, from {city}, address {address}, {zipcode}. Payment will be processed via {NameOnCard}, card {cardNumber}, expires {expiryDate}, CVV {cvv}.",
        "I'd like to schedule a haircut for {selectedDate} at {selectedTime}. Contact: {email}. This appointment is under {name}, from {city}, at {address}, {zipcode}. Payment via {NameOnCard}, card {cardNumber}, expiring {expiryDate}, CVV {cvv}.",
        "Hey, I need an appointment for a haircut on {selectedDate} at {selectedTime}. Please reach out at {email}. Booking for {name}, staying in {city}, at {address}, {zipcode}. Payment will be via {NameOnCard}, card {cardNumber}, expiring {expiryDate}, CVV {cvv}.",
        "Hi! Can you book a haircut service for {selectedDate} at {selectedTime}? Contact at {email}. The booking is under {name}, residing in {city}, address {address}, {zipcode}. Payment method: {NameOnCard}, card {cardNumber}, expiring {expiryDate}, CVV {cvv}.",
        "Hello! I'd like a haircut service on {selectedDate} at {selectedTime}. You can reach me via {email}. Reserved for {name}, in {city}, at {address}, {zipcode}. Payment through {NameOnCard}, card {cardNumber}, expiry {expiryDate}, CVV {cvv}.",
        "Can you set up a haircut appointment for {selectedDate} at {selectedTime}? You can contact me at {email}. Appointment booked under {name}, based in {city}, at {address}, {zipcode}. Payment will be via {NameOnCard}, card {cardNumber}, expiry {expiryDate}, CVV {cvv}.",
        "Hey! I need a haircut scheduled for {selectedDate} at {selectedTime}. Contact me at {email}. Reserved for {name}, living in {city}, at {address}, {zipcode}. Payment will be processed with {NameOnCard}, card {cardNumber}, expires {expiryDate}, CVV {cvv}.",
        "Please arrange a haircut appointment on {selectedDate} at {selectedTime}. You can reach me at {email}. This booking is for {name}, currently in {city}, at {address}, {zipcode}. Payment handled by {NameOnCard}, card {cardNumber}, expiry {expiryDate}, CVV {cvv}.",
        "I'd like to book a service for {selectedDate} at {selectedTime}. Contact at {email}. Reserved under {name}, from {city}, address {address}, {zipcode}. Payment method: {NameOnCard}, card {cardNumber}, expires {expiryDate}, CVV {cvv}.",
        "Hi, I need an appointment on {selectedDate} at {selectedTime}. Please contact at {email}. Scheduled under {name}, from {city}, currently staying at {address}, {zipcode}. Payment processed via {NameOnCard}, card {cardNumber}, expires {expiryDate}, CVV {cvv}.",
        "Hello! Can you schedule a haircut for {selectedDate} at {selectedTime}? You can reach me at {email}. Appointment for {name}, residing in {city}, at {address}, {zipcode}. Payment via {NameOnCard}, card {cardNumber}, expiry {expiryDate}, CVV {cvv}.",
    ]

    output_list = []

    for _ in range(num_prompts):
        selected_date_prompt, selected_date_result, selected_time = (
            generate_random_date_and_time()
        )

        if selected_time is None:
            continue

        user = generate_user_details()
        payment_details = generate_payment_details(user["name"])
        service_fee = generate_random_price()

        template = random.choice(prompt_templates)

        prompt = template.format(
            selectedDate=selected_date_prompt,
            selectedTime=selected_time,
            name=user["name"],
            email=user["email"],
            address=user["address"],
            city=user["city"],
            zipcode=user["zip"],
            cardNumber=payment_details["cardNumber"],
            expiryDate=payment_details["expiryDate"],
            cvv=payment_details["cvv"],
            NameOnCard=payment_details["NameOnCard"],
        )

        booking_result = {
            "userDetails": user,
            "bookingDetails": {
                "selectedDate": selected_date_result,
                "selectedTime": selected_time,
                "serviceFee": service_fee,
            },
            "paymentDetails": payment_details,
        }

        output_list.append({"prompt": prompt, "bookingResults": booking_result})

    with open(output_file, "w", encoding="utf-8") as file:
        json.dump(output_list, file, indent=4)

    print(f"Generated {len(output_list)} prompts and saved to {output_file}.")
    return output_list


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Generate booking prompts and results."
    )
    parser.add_argument(
        "-n",
        "--num_prompts",
        type=int,
        default=20,
        help="Number of prompts to generate (default is 20).",
    )
    parser.add_argument(
        "-o",
        "--output",
        type=str,
        default="booking_prompts.json",
        help="Output file to save the generated prompts.",
    )
    args = parser.parse_args()

    create_prompts_with_results(args.num_prompts, args.output)
