import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { setCategories } from "../../actions/transactions";

import Select from "react-select";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();

import { Form } from "react-bootstrap";

function CategoryFilter(props) {
    const { categories, transactions, setCategories, selectedWallet } = props;
    const [allCategories, setAllCategories] = useState(
        Object.keys(
            _.groupBy(
                transactions.filter(t => t.wallet === selectedWallet.id),
                "category"
            )
        ).map(category => {
            return {
                value: category,
                label: category
            };
        })
    );

    const onChangeCategories = selectedCategories => {
        if (!selectedCategories) {
            setCategories([]);
        } else {
            setCategories(selectedCategories);
        }
    };

    useEffect(
        () =>
            setAllCategories(
                Object.keys(
                    _.groupBy(
                        transactions.filter(
                            t => t.wallet === selectedWallet.id
                        ),
                        "category"
                    )
                ).map(category => {
                    return {
                        value: category,
                        label: category
                    };
                })
            ),
        [transactions, selectedWallet]
    );

    return (
        <Form.Group controlId="categoriesSelect">
            <Form.Label className="text-secondary">By category</Form.Label>
            <Select
                value={categories.map(category => {
                    return {
                        value: category,
                        label: category
                    };
                })}
                isMulti
                closeMenuOnSelect={false}
                options={allCategories}
                components={animatedComponents}
                onChange={onChangeCategories}
            />
        </Form.Group>
    );
}

const mapStateToProps = state => ({
    transactions: state.transactions.transactions,
    categories: state.transactions.transactionsFilters.categories,
    selectedWallet: state.wallets.currentWallet
});

export default connect(mapStateToProps, { setCategories })(CategoryFilter);
