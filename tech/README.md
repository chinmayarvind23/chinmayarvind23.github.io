# Technology logos

These 69 locally packaged SVGs are real brand marks from Simple Icons and Devicon. There are no runtime CDN requests or icon-library dependencies. `sources.json` records the source of every file and its associated portfolio labels.

- Most icons: [Simple Icons 16.31.0](https://github.com/simple-icons/simple-icons/tree/16.31.0/icons), extracted from the official npm package. The collection's CC0 license and trademark disclaimer are included.
- Java, AWS, gRPC, Matplotlib, and Playwright: [Devicon](https://github.com/devicons/devicon), with its MIT license included. Exact original SVG paths are in `sources.json`.
- OpenAI: archived [Simple Icons 14.15.0](https://github.com/simple-icons/simple-icons/blob/14.15.0/icons/openai.svg).

The component displays each untouched vector as a monochrome CSS mask for contrast in both themes. Family-level aliases use the actual parent's mark: NVIDIA for CUDA, AWS for AWS services, Snowflake for Cortex, LangChain for LangSmith, and Hugging Face for its Transformers, Hub, and Spaces offerings. Tool names remain exactly as supplied in the résumé.

Concepts such as retrieval, calibration, and evaluation receive a generic processor symbol, which is not presented as a brand logo. Software for which no appropriate mark has been verified remains a text-only tag rather than receiving an invented logo. See `src/lib/data/tech-logos.ts` for the complete mapping.
