# AutoTracker

## Architecture

                         ┌───────────────────────┐
                         │   Gmail / Outlook      │
                         │      OAuth Access      │
                         └───────────┬───────────┘
                                     │
                                     ▼
                         ┌───────────────────────┐
                         │   Initial Sync        │
                         │                       │
                         │ Fetch last 6 months   │
                         │ of emails             │
                         └───────────┬───────────┘
                                     │
                                     ▼
                         ┌───────────────────────┐
                         │   Pre-filter          │
                         │                       │
                         │ Sender + subject +    │
                         │ keywords + snippet    │
                         │                       │
                         │ order / purchase /    │
                         │ shipping / delivery / │
                         │ pedido / compra / ... │
                         └───────────┬───────────┘
                                     │
                              Candidate email?
                              /              \
                            NO                YES
                            │                  │
                            ▼                  ▼
                         Ignore               AI
                                               │
                                               ▼
                                  ┌────────────────────────┐
                                  │ AI Classification &    │
                                  │ Data Extraction         │
                                  │                        │
                                  │ - Is it an order?      │
                                  │ - Merchant              │
                                  │ - Order ID              │
                                  │ - Order date            │
                                  │ - Total / currency      │
                                  │ - Products              │
                                  │ - Tracking number       │
                                  │ - Carrier               │
                                  │ - Status                │
                                  │ - Estimated delivery    │
                                  └────────────┬───────────┘
                                               │
                                        Is it an order?
                                         /           \
                                       NO             YES
                                       │               │
                                       ▼               ▼
                                    Ignore         Normalize
                                                       │
                                                       ▼
                                         ┌────────────────────────┐
                                         │ Find existing order    │
                                         │ in database            │
                                         └────────────┬───────────┘
                                                      │
                                      ┌───────────────┼───────────────┐
                                      │               │               │
                                      ▼               ▼               ▼
                              Merchant +        Tracking +      Other matching
                               Order ID          Number            data
                                      │               │               │
                                      └───────────────┼───────────────┘
                                                      │
                                                      ▼
                                               Existing order?
                                                /          \
                                              YES           NO
                                               │             │
                                               ▼             ▼
                                        Update order     Create order
                                               │             │
                                               └──────┬──────┘
                                                      ▼
                                             Save email/event
                                                      │
                                                      ▼
                                            Tracking available?
                                             /              \
                                           YES               NO
                                            │                 │
                                            ▼                 ▼
                                      Tracking API      Keep order
                                            │            without tracking
                                            ▼                 │
                                      Update status            │
                                            │                 │
                                            └────────┬────────┘
                                                     ▼
                                               Update UI


                   ─────────── CONTINUOUS SYNC ───────────

                           New email arrives
                                  │
                                  ▼
                             Pre-filter
                                  │
                                  ▼
                                  AI
                                  │
                                  ▼
                          Extract information
                                  │
                                  ▼
                       Match existing order
                          /             \
                        YES              NO
                         │                │
                         ▼                ▼
                  Update order       Create order
                         │                │
                         └───────┬────────┘
                                 ▼
                           Save event
                                 │
                                 ▼
                           Update UI
